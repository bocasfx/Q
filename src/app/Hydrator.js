
class Hydrator {
  hydrate(store, payload) {
    store.dispatch({
      type: 'HYDRATION_STARTED'
    });

    if (payload.nodes) {
      store.dispatch({
        type: 'HYDRATE_NODES',
        payload: payload.nodes
      });
    }

    if (payload.streams) {
      store.dispatch({
        type: 'HYDRATE_STREAMS',
        payload: payload.streams
      });
    }

    if (payload.fx) {
      store.dispatch({
        type: 'HYDRATE_FX',
        payload: payload.fx
      });
    }

    store.dispatch({
      type: 'HYDRATION_COMPLETE'
    });
  }
}

let hydrator = new Hydrator();

export default hydrator;
