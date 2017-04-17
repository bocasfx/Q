import uuidv1 from 'uuid/v1';

class Particle {
  constructor(position) {
    this.position = position;
    this.id = uuidv1();
    this.disabled = false;

    this.particleImg = new Image();
    this.particleImg.src = './icons/elements/particle.png';

    this.disabledParticleImg = new Image();
    this.disabledParticleImg.src = './icons/elements/disabled-particle.png';
  }

  render(canvasContext) {

    if (this.disabled) {
      canvasContext.drawImage(this.disabledParticleImg, this.position[0] - 7.5, this.position[1] - 7.5);
    } else {
      canvasContext.drawImage(this.particleImg, this.position[0] - 7.5, this.position[1] - 7.5);
    }
  }
}

export default Particle;