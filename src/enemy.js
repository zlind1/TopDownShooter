
class Enemy {
  static RADIUS = 15;
  static COLOR = 'red';
  static SPEED = 3;
  constructor(x=0, y=0) {
    this.position = V2(x, y);
    this.direction = V2();
  }
  draw = (ctx) => {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.beginPath();
      ctx.arc(0, 0, Enemy.RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = Enemy.COLOR;
      ctx.fill();
    ctx.restore();
  }
  update = (game) => {
    this.direction = game.player.position.sub(this.position).norm();
    this.position.add_i(this.direction.scale(Enemy.SPEED));
    for (const bullet of game.bullets) {
      if (bullet.position.sub(this.position).length() < Enemy.RADIUS) {
        game.enemies = game.enemies.filter(item => item !== this);
        game.bullets = game.bullets.filter(item => item !== bullet);
        break;
      }
    }
  }
}
