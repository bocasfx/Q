import serializer from '../app/Serializer';
import hydrator from './Hydrator';
import store from '../app/Store';

let electron = null;
let dialog = null;
let fs = null;
let ipcRenderer = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs');
  dialog = electron.remote.dialog;
  ipcRenderer = electron.ipcRenderer;
}

const filters = {
  filters: [{
    name: 'text',
    extensions: ['q']
  }]
};

class EventHandler {

  initialize() {
    if (ipcRenderer) {
      ipcRenderer.on('QEvents', (event, message) => {
        switch (message) {
          case 'selectAll':
            return store.dispatch({
              type: 'SELECT_ALL_NODES'
            });
          case 'saveAs':
            return this.serializeProject();
          case 'open':
            return this.hydrateProject();
          case 'new':
            return this.newProject();
          default:
            return null;
        }
      });
    }

    window.onkeydown = (event) => {
      if (event.metaKey) {

        switch (event.key) {

          // Select All
          case 'a':
          case 'A':
            store.dispatch({
              type: 'SELECT_ALL_NODES'
            });
            return;

          // Save
          case 's':
          case 'S':
            return this.serializeProject();

          // Open
          case 'o':
          case 'O':
            return this.hydrateProject();

          // Mixer
          // case 'm':
          // case 'M':
          //   return this.toggleDevice('mixer');

          // Grab
          case 'g':
          case 'G':
            return this.toggleDevice('grab');

          // New
          case 'n':
          case 'N':
            return this.newProject();

          default:
            return null;
        }
      } else {

        switch (event.key) {
          //Play/Pause
          case ' ':
            event.stopPropagation();
            event.returnValue = false;
            store.dispatch({
              type: 'TOGGLE_TRANSPORT'
            });
            if (!store.getState().transport.playing) {
              store.dispatch({
                type: 'STOP_NODES'
              });
            }
            return;

          // Backspace
          case 'Backspace':
            store.dispatch({
              type: 'UNLINK_SELECTED_NODES'
            });
            return store.dispatch({
              type: 'DELETE_SELECTED_NODES'
            });

          default:
            return null;
        }
      }
    };

    window.onresize = () => {
      store.dispatch({
        type: 'SET_WINDOW_SIZE',
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  }

  serializeProject() {
    if (!dialog) {
      this.saveContent();
      return;
    }

    dialog.showSaveDialog(filters, (fileName) => {
      this.saveContent('file', fileName);
    });
  };

  hydrateProject() {
    if (!dialog) {
      this.loadContent();
      return;
    }

    dialog.showOpenDialog(filters, (fileNames) => {
      if (fileNames && fileNames.length) {
        this.loadContent('file', fileNames[0]);
      }
    });
  };

  newProject() {
    let response = true;
    if (store.getState().app.dirty) {
      response = window.confirm('Discard changes?');
    }

    if (response) {
      store.dispatch({type: 'HYDRATION_STARTED'});
      store.dispatch({type: 'DELETE_ALL_NODES'});
      store.dispatch({type: 'DELETE_ALL_STREAMS'});
      store.dispatch({type: 'RESET_FX_CONFIGURATION'});
      store.dispatch({type: 'HYDRATION_COMPLETE'});
    }
  }

  toggleDevice(device) {
    store.dispatch({
      type: 'TOGGLE_DEVICE',
      device
    });
  };

  loadContent(type, fileName) {
    if (type === 'file') {
      if (fileName === undefined) {
        return;
      }

      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          alert(err);
          return;
        }

        let payload = JSON.parse(data);

        hydrator.hydrate(store, payload);
      });
    } else {
      hydrator.hydrate(store, localStorage.QState);
    }
  };

  saveContent(type, fileName) {
    const state = store.getState();

    if (type === 'file') {
      if (fileName === undefined) {
        return;
      }

      fs.writeFile(fileName, serializer.serialize(state), (err) => {
        if (err) {
          alert(err);
          return;
        }
      });
    }

    localStorage.QState = serializer.serialize(state);
  };
}

let handler = new EventHandler();

export default handler;
