import uuidv1 from 'uuid/v1';

class Particle {
  constructor(position) {
    this.position = position;
    this.id = uuidv1();

    this.particleImg = new Image();
    this.particleImg.src = '/icons/nodes/particle.png';
  }

  render(canvasContext) {

    canvasContext.drawImage(this.particleImg, this.position[0] - 7.5, this.position[1] - 7.5);
  }
}

export default Particle;