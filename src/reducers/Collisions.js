let initialState ={
  calculating: false
};

const setDetectionStatus = (state, status) => {
  return Object.assign({}, state, { calculating: status });
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SET_DETECTION_STATUS':
      return setDetectionStatus(state, action.status);
    default:
      return state;
  }
};
