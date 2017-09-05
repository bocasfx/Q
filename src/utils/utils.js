import config from '../config/config';
import _ from 'lodash';

export const calculateDistance = (a, b) => {
  let x0 = a[0];
  let y0 = a[1];
  let x1 = b[0];
  let y1 = b[1];

  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
};

export const getPosition = (event) => {
  let x = event.pageX;
  let y = event.pageY;

  x -= config.menu.width;
  y -= config.transport.height;

  return [x, y];
};

export const getSelectedElement = (elements) => {
  return _.filter(elements, (element) => {
    return element.selected;
  })[0];
};

export const calculateNodeBorderDistance = (a, b) => {
  let d2 = 22;
  let d = calculateDistance(a, b);

  let xa = a[0];
  let ya = a[1];

  let xb = b[0];
  let yb = b[1];

  let xc = xa - ((d2 * (xa - xb)) / d);
  let yc = ya - ((d2 * (ya - yb)) / d);

  return [xc, yc];
};

export const getNodeColor = (type) => {
  return config[type].color;
};

export const toPolar = (x, y) => {
  let r = Math.sqrt((x * x) + (y * y));

  let theta = Math.atan2(-y, -x);
  if (theta < 0) {
    theta += 2 * Math.PI;
  }
  return {
    radius: r,
    angle: theta
  };
};

export const clip = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const timestamp = () => {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};
