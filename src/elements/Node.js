import config from '../config/config';

class Node {

  constructor(position) {
    this.position = position;
  }

  render(context) {
    context.beginPath();
    context.arc(this.position[0], this.position[1], config.node.radius, 0, 2 * Math.PI, false);
    context.strokeStyle = config.node.strokeStyle;
    context.lineWidth = config.node.lineWidth;
    context.setLineDash(config.node.lineDash);
    context.fillStyle = config.node.fillStyle;
    context.fill();
    context.stroke();
  }
}

export default Node;