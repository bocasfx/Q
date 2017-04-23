export const showToaster = (message, level) => {
  return {
    type: 'SHOW_TOASTER',
    message,
    level
  };
};

export const hideToaster = () => {
  return {
    type: 'HIDE_TOASTER'
  };
};
