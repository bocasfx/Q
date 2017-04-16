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

  return [x, y];
};

export const getSelectedElement = (elements) => {
  return _.filter(elements, (element) => {
    return element.selected;
  })[0];
};
