export const addStream = (position, event) => {
  return {
    type: 'ADD_STREAM',
    position,
    event
  };
};
