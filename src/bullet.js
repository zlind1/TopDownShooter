

class Bullet {
  static SPEED = 10;
  static LENGTH = 10;
  static WIDTH = 5;
  static COLOR = 'black';
  constructor(position, angle) {
    this.position = position;
    this.angle = angle;
    this.velocity = V2().lookAt(angle).scale_i(Bullet.SPEED);
  }
  draw = (ctx) => {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = Bullet.COLOR;
      ctx.fillRect(0, -Bullet.WIDTH/2, Bullet.LENGTH, Bullet.WIDTH);
    ctx.restore();
  }
  update = (game) => {
    this.position.add_i(this.velocity);
    const offRight = this.position.x > game.width;
    const offLeft = this.position.x < 0;
    const offBottom = this.position.y > game.height;
    const offTop = this.position.y < 0;
    if (offRight || offLeft || offBottom || offTop) {
      game.bullets = game.bullets.filter(item => item !== this);
    }
  }
}
