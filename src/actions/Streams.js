export const addStream = (position, event) => {
  return {
    type: 'ADD_STREAM',
    position,
    event
  };
};

export const deleteStream = (id) => {
  return {
    type: 'DELETE_STREAM',
    id
  };
};

export const selectStream = (id) => {
  return {
    type: 'SELECT_STREAM',
    id
  };
};
