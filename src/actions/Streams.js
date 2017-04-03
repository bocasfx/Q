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
