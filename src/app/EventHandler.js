import { serialize } from '../app/serializer';
import hydrator from './Hydrator';

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

  constructor(store) {
    this.store = store;
  }

  initialize() {
    window.onkeypress = (event) => {
      if (event.ctrlKey) {

        switch (event.key) {

          // Select All
          case 'a':
          case 'A':
            this.store.dispatch({
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
            this.store.dispatch({
              type: 'TOGGLE_TRANSPORT'
            });
            if (!this.store.getState().transport.playing) {
              this.store.dispatch({
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
      this.saveContent();
      location.reload();
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
    this.store.dispatch({
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
          // TODO: Show notification
          console.log(err);
          return;
        }

        let payload = JSON.parse(data);

        hydrator.hydrate(this.store, payload);
      });
    } else {
      hydrator.hydrate(this.store, localStorage.QState);
    }
  };

  saveContent(type, fileName) {
    const state = this.store.getState();

    if (type === 'file') {
      if (fileName === undefined) {
        return;
      }

      fs.writeFile(fileName, serialize(state), (err) => {
        if (err) {
          // TODO: Show notification
          console.log(err);
          return;
        }
      });
    }

    localStorage.QState = serialize(state);
  };
}

export default EventHandler;
