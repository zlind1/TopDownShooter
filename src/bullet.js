

class Bullet {
  constructor(x, y, angle) {
    this.position = V2(x, y);
    this.angle = angle;
    this.speed = 10;
    this.velocity = V2(0, 1).lookAt(angle).scale_i(this.speed);
  }
  draw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.angle);
      ctx.fillRect(0, -2, 10, 4);
    ctx.restore();
  }
  update(game) {
    this.position.add_i(this.velocity);
    if (this.position.x > game.width || this.position.x < 0 || this.position.y > game.height || this.position.y < 0) {
      game.bullets = game.bullets.filter(item => item !== this);
    }
  }
}
