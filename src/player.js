

class Player {
  constructor(x, y) {
    this.position = V2(x, y);
    this.lookPosition = V2(0, 0);
    this.velocity = V2(0, 0);
    this.angle = 0;
    this.speed = 5;
    this.shooting = false;
  }
  draw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.fillRect(0, -5, 30, 10)
    ctx.restore();
  }
  update(game) {
    // this.angle += Math.PI/30;
    this.velocity.x = this.velocity.y = 0;
    if (game.keys.LEFT) {
      this.velocity.x--;
    }
    if (game.keys.RIGHT) {
      this.velocity.x++;
    }
    if (game.keys.UP) {
      this.velocity.y--;
    }
    if (game.keys.DOWN) {
      this.velocity.y++;
    }
    this.position.add_i(this.velocity.scale(this.speed));
    this.angle = this.lookPosition.sub(this.position).angle();
    if (game.keys.SHOOT) {
      game.bullets.push(new Bullet(this.position.x, this.position.y, this.angle));
    }
  }
}
