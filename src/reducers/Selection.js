import { selection } from '../config/initial-state';

const setSelection = (state, objType) => {
  return Object.assign({}, state, { objType });
};

export default (state = selection, action) => {
  switch (action.type) {

    case 'SET_SELECTION':
      return setSelection(state, action.objType);

    default:
      return state;
  }
};
