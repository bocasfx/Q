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

export const getSelectedElements = (elements) => {
  let selectedElements = _.filter(elements, (element) => {
    return element.selected;
  });
  return _.sortBy(selectedElements, [(element) => { 
    return element.selectionIdx; 
  }]);
};

export const getNodeById = (nodes, nodeId) => {
  return _.find(nodes, (node) => {
    return node.id === nodeId;
  });
};

export const graphHasLoop = (nodeList, node, rootId, checkForRoot) => {
  if (checkForRoot && node.id === rootId) {
    return true;
  }
  for (var i = 0; i < node.links.length; i++) {
    let link = getNodeById(nodeList, node.links[i]);
    let result = graphHasLoop(nodeList, link, rootId, true);
    if (result) {
      return result;
    }
  }
  return false;
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
    angle: theta,
  };
};

export const clip = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const timestamp = () => {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

export const buffer2ArrayBuffer = (buffer) => {
  let arrayBuffer = new ArrayBuffer(buffer.length);
  let view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
};

export const getNodesWithinDistance = (nodes, position) => {
  let matches = [];
  nodes.forEach((node) => {
    let distance = calculateDistance(node.position, position);
    if (distance <= config.app.doubleClickDistance) {
      matches.push(node);
    }
  });
  return matches;
};

export const findClosestFrequency = (notes, closestTo) => {
  let frequencies = notes.map((note) => note.frequency);
  let closestFreq = Math.max.apply(null, frequencies);

  for(let i = 0; i < frequencies.length; i++) {
    if (frequencies[i] >= closestTo && frequencies[i] < closestFreq) {
      closestFreq = frequencies[i];
    }
  }

  let closest = _.find(notes, (note) => {
    return note.frequency === closestFreq;
  });

  return closest;
};
