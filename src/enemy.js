
class Enemy {
  constructor () {
    this.position = V2(0, 0);
    this.direction = V2(0, 0);
    this.velocity = V2(0, 0);
  }
  draw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    ctx.restore();
  }
  update(game) {
    this.direction = game.player.position.sub(this.position).norm();
    this.velocity = this.direction.scale(this.speed);
    this.position.add_i(this.velocity.scale(this.speed));
  }
}
