
class Enemy {
  static RADIUS = 15;
  static COLOR = 'black';
  constructor () {
    this.position = V2();
    this.direction = V2();
    this.velocity = V2();
  }
  draw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.beginPath();
      ctx.arc(0, 0, Enemy.RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = Enemy.COLOR;
      ctx.fill();
    ctx.restore();
  }
  update(game) {
    this.direction = game.player.position.sub(this.position).norm();
    this.velocity = this.direction.scale(this.speed);
    this.position.add_i(this.velocity.scale(this.speed));
  }
}
