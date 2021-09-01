
class Game {
  static COLOR = 'yellow';
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.keys = {LEFT: false, RIGHT: false, UP: false, DOWN: false};
    this.bullets = [];
    this.enemies = [];
    this.player = new Player(window.innerWidth/2, window.innerHeight/2);
    this.width = 0;
    this.height = 0;
    this.timer = 0;
    window.onresize = this.resizeCanvas;
    window.onmousedown = window.onmouseup = this.handleMouseClick;
    window.onmousemove = window.onmousedrag = this.handleMouseMove;
    window.onkeydown = window.onkeyup = this.handleKeys;
    this.resizeCanvas();
    window.requestAnimationFrame(this.update);
  }
  resizeCanvas = () => {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.draw();
  }
  spawnEnemy = () => {
    const rand = Math.random();
    let x, y;
    if (rand < 0.25) {
      x = 0;
      y = Math.random() * this.height;
    } else if (rand < 0.5) {
      x = this.width;
      y = Math.random() * this.height;
    } else if (rand < 0.75) {
      x = Math.random() * this.width;
      y = 0;
    } else {
      x = Math.random() * this.width;
      y = this.height;
    }
    this.enemies.push(new Enemy(x, y));
  }
  draw = () => {
    this.ctx.fillStyle = Game.COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (const bullet of this.bullets) {
      bullet.draw(this.ctx);
    }
    for (const enemy of this.enemies) {
      enemy.draw(this.ctx);
    }
    this.player.draw(this.ctx);
  }
  update = () => {
    this.player.update(this);
    for (const bullet of this.bullets) {
      bullet.update(this);
    }
    for (const enemy of this.enemies) {
      enemy.update(this);
    }
    this.draw();
    this.timer++;
    if (this.timer % 100 == 0) {
      this.spawnEnemy();
    }
    window.requestAnimationFrame(this.update);
  }
  handleMouseClick = (e) => {
    const mouseDown = (e.type === 'mousedown');
    this.keys.SHOOT = mouseDown;
  }
  handleMouseMove = (e) => {
    this.player.lookPosition.x = e.x;
    this.player.lookPosition.y = e.y;
  }
  handleKeys = (e) => {
    const keyDown = (e.type === 'keydown');
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      this.keys.LEFT = keyDown;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      this.keys.RIGHT = keyDown;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
      this.keys.UP = keyDown;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      this.keys.DOWN = keyDown;
    } else if (e.key === ' ') {
      this.keys.SHOOT = keyDown;
    }
  }
}
