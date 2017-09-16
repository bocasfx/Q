import serializer from '../app/Serializer';
import hydrator from './Hydrator';
import store from '../app/Store';

let electron = null;
let dialog = null;
let fs = null;

if (window.require) {
  electron = window.require('electron');
  fs = window.require('fs');
  dialog = electron.remote.dialog;
}

const filters = {
  filters: [{
    name: 'text',
    extensions: ['q']
  }]
};

class EventHandler {

  initialize() {
    window.addEventListener('keyup', (event) => {
      console.log(event);
    }, true);

    window.onkeydown = (event) => {
      event.stopPropagation();
      event.returnValue = false;
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
          case 'm':
          case 'M':
            return this.toggleDevice('mixer');

          // Grab
          case 'g':
          case 'G':
            return this.toggleDevice('grab');

          default:
            return null;
        }
      } else {

        switch (event.key) {
          //Play/Pause
          case ' ':
            store.dispatch({
              type: 'TOGGLE_TRANSPORT'
            });
            if (!store.getState().transport.playing) {
              store.dispatch({
                type: 'STOP_NODES'
              });
            }
            return; 

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
      this.loadContent('file', fileNames[0]);
    });
  };

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
