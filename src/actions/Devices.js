export const toggleDevice = (device) => {
  return {
    type: 'TOGGLE_DEVICE',
    device
  };
};

export const showNodeSettings = (id) => {
  return {
    type: 'SHOW_NODE_SETTINGS',
    id
  };
};

export const hideNodeSettings = () => {
  return {
    type: 'HIDE_NODE_SETTINGS'
  };
};

export const hideMixer = () => {
  return {
    type: 'HIDE_MIXER'
  };
};
