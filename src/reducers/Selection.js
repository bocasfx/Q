const initialState = {
  objType: 'streams'
};

const setSelection = (state, objType) => {
  return Object.assign({}, state, { objType });
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_SELECTION':
      return setSelection(state, action.objType);

    default:
      return state;
  }
};
