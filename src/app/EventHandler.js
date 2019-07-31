import serializer from '../app/Serializer';
import hydrator from './Hydrator';
import store from '../app/Store';
import fs from 'fs';

class EventHandler {
  initialize() {
    window.onkeydown = event => {
      if (event.metaKey) {
        if (event.shiftKey) {
          switch (event.key) {
            // Clear local storage
            case 'C':
              return this.clearLocalStorage();

            // Save to local storage
            case 'S':
              this.saveContent();
              alert('Project saved to internal storage.');
              return;

            // Load local storage
            case 'O':
              this.loadContent();
              return;

            default:
              return null;
          }
        }

        switch (event.key) {
          // Select All
          case 'a':
          case 'A':
            store.dispatch({ type: 'SET_SELECTION', objType: 'nodes' });
            store.dispatch({ type: 'DESELECT_STREAMS' });
            store.dispatch({ type: 'SELECT_ALL_NODES' });
            return;

          // Save
          case 's':
          case 'S':
            event.stopPropagation();
            event.returnValue = false;
            this.saveContent();
            return;

          // Open
          case 'o':
          case 'O':
            return this.loadContent();

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
              type: 'TOGGLE_TRANSPORT',
            });
            if (!store.getState().transport.playing) {
              store.dispatch({ type: 'STOP_NODES' });
              store.dispatch({ type: 'DEQUEUE_PARTICLES' });
            }
            return;

          // Backspace
          case 'Backspace':
            store.dispatch({ type: 'STOP_SELECTED_NODES' });
            store.dispatch({ type: 'UNLINK_SELECTED_NODES' });
            store.dispatch({ type: 'DELETE_SELECTED_NODES' });
            store.dispatch({ type: 'DELETE_SELECTED_STREAMS' });
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
        height: window.innerHeight,
      });
    };
  }

  newProject() {
    let response = true;
    if (store.getState().app.dirty) {
      response = window.confirm('Discard changes?');
    }

    if (response) {
      store.dispatch({ type: 'HYDRATION_STARTED' });
      store.dispatch({ type: 'DELETE_ALL_NODES' });
      store.dispatch({ type: 'DELETE_ALL_STREAMS' });
      store.dispatch({ type: 'HYDRATION_COMPLETE' });
    }
  }

  toggleDevice(device) {
    store.dispatch({
      type: 'TOGGLE_DEVICE',
      device,
    });
  }

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
      hydrator.hydrate(store, JSON.parse(localStorage.QState));
    }
  }

  saveContent(type, fileName) {
    const state = store.getState();

    if (type === 'file') {
      if (fileName === undefined) {
        return;
      }

      fs.writeFile(fileName, serializer.serialize(state), err => {
        if (err) {
          alert(err);
          return;
        }
      });
    }

    localStorage.QState = serializer.serialize(state);
  }

  clearLocalStorage() {
    localStorage.removeItem('QState');
  }
}

export default new EventHandler();
