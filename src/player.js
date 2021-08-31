

class Player {
  static RADIUS = 15;
  static BARREL_WIDTH = 10;
  static BARREL_LENGTH = 30;
  static SPEED = 5;
  static COLOR = 'red';
  constructor(x, y) {
    this.position = V2(x, y);
    this.lookPosition = V2(0, 0);
    this.velocity = V2(0, 0);
    this.angle = 0;
    this.shooting = false;
  }
  draw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.arc(0, 0, Player.RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = Player.COLOR;
      ctx.fill();
      ctx.fillRect(0, -Player.BARREL_WIDTH/2, Player.BARREL_LENGTH, Player.BARREL_WIDTH);
    ctx.restore();
  }
  update(game) {
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
    this.position.add_i(this.velocity.scale(Player.SPEED));
    this.angle = this.lookPosition.sub(this.position).angle();
    if (game.keys.SHOOT) {
      const barrelPosition = this.position.add(V2().lookAt(this.angle).scale_i(Player.BARREL_LENGTH/2));
      const bullet = new Bullet(barrelPosition, this.angle);
      game.bullets.push(bullet);
    }
  }
}
