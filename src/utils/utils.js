
export const normalizeFrequency = (value) => {
  let maxValue = window.innerHeight;
  return (value / maxValue) * 2000;
};

export const normalizeVelocity = (value) => {
  let maxValue = window.innerWidth;
  return ((maxValue - value) / maxValue);
};

export const calculateDistance = (a, b) => {
  let x0 = a[0];
  let y0 = a[1];
  let x1 = b[0];
  let y1 = b[1];

  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
};