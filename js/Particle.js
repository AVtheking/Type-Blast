const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
export default class Particle {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.draw();
    this.alpha -= 0.02;
    this.x += this.dx;
    this.y += this.dy;
  }
}
