export const toggleDevice = (device) => {
  return {
    type: 'TOGGLE_DEVICE',
    device
  };
};

export const hideMixer = () => {
  return {
    type: 'HIDE_MIXER'
  };
};
