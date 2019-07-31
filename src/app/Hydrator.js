class Hydrator {
  hydrate(store, payload) {
    store.dispatch({
      type: 'HYDRATION_STARTED',
    });

    store.dispatch({ type: 'DELETE_ALL_NODES' });
    store.dispatch({ type: 'DELETE_ALL_STREAMS' });

    if (payload.nodes) {
      store.dispatch({
        type: 'HYDRATE_NODES',
        payload: payload.nodes,
      });
    }

    if (payload.streams) {
      store.dispatch({
        type: 'HYDRATE_STREAMS',
        payload: payload.streams,
      });
    }

    store.dispatch({
      type: 'HYDRATION_COMPLETE',
    });
  }
}

let hydrator = new Hydrator();

export default hydrator;
