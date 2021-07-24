
let canvas, ctx, player, game;

function main() {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  player = new Player(window.innerWidth/2, window.innerHeight/2);
  game = {
    keys: {LEFT: false, RIGHT: false, UP: false, DOWN: false},
    bullets: [],
    width: 0,
    height: 0,
  };
  resizeCanvas();
  window.requestAnimationFrame(update);
  window.onmousedown = window.onmouseup = handleMouseClick;
  window.onmousemove = window.onmousedrag = handleMouseMove;
  window.onkeydown = window.onkeyup = handleKeys;
}

function resizeCanvas() {
  game.width = canvas.width = window.innerWidth;
  game.height = canvas.height = window.innerHeight;
  redraw();
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const bullet of game.bullets) {
    bullet.draw(ctx);
  }
  player.draw(ctx);
}

function update() {
  player.update(game);
  for (const bullet of game.bullets) {
    bullet.update(game);
  }
  redraw();
  window.requestAnimationFrame(update);
}

function handleMouseClick(e) {
  if (e.type === 'mousedown') {
    game.keys.SHOOT = true;
  } else if (e.type === 'mouseup') {
    game.keys.SHOOT = false;
  }
}

function handleMouseMove(e) {
  player.lookPosition.x = e.x;
  player.lookPosition.y = e.y;
}

function handleKeys(e) {
  if (e.type === 'keydown') {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      game.keys.LEFT = true;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      game.keys.RIGHT = true;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
      game.keys.UP = true;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      game.keys.DOWN = true;
    } else if (e.key === ' ') {
      game.keys.SHOOT = true;
    }
  } else if (e.type === 'keyup') {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
      game.keys.LEFT = false;
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      game.keys.RIGHT = false;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
      game.keys.UP = false;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      game.keys.DOWN = false;
    } else if (e.key === ' ') {
      game.keys.SHOOT = false;
    }
  }
}
