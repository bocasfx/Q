import { midi } from '../config/initial-state';

const addDestination = (state, destination) => {
  let destinations = state.destinations.splice(0);
  destinations.push(destination);
  let newState = Object.assign({}, state, {destinations});
  return newState;
};

export default (state = midi, action) => {
  switch (action.type) {

    case 'ADD_DESTINATION':
      return addDestination(state, action.destination);

    default:
      return state;
  }
};
