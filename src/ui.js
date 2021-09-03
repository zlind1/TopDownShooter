
class UI {
  constructor() {
    this.ui = document.querySelector('#ui');
    this.score = document.querySelector('#score');
  }
  updateScore = (game) => {
    this.score.textContent = `Score: ${game.score}`
  }
  startMenu = (game) => {
    const menu = document.createElement('div');
    menu.className = 'menu';
    const title = document.createElement('h1');
    title.textContent = 'Top Down Shooter';
    menu.appendChild(title);
    const subtitle = document.createElement('h3');
    subtitle.textContent = 'Move with WASD or arrow keys, aim with mouse, click or press space to fire';
    menu.appendChild(subtitle);
    const startButton = document.createElement('button');
    startButton.textContent = 'Start game';
    menu.appendChild(startButton);
    startButton.onclick = () => {
      this.ui.removeChild(menu);
      game.start();
    }
    this.ui.appendChild(menu);
  }
  gameOver = (game) => {
    const menu = document.createElement('div');
    menu.className = 'menu';
    const title = document.createElement('h1');
    title.textContent = 'Game over';
    menu.appendChild(title);
    const subtitle = document.createElement('h3');
    subtitle.textContent = `Your score: ${game.score}`;
    menu.appendChild(subtitle);
    const startButton = document.createElement('button');
    startButton.textContent = 'Restart game';
    menu.appendChild(startButton);
    startButton.onclick = () => {
      this.ui.removeChild(menu);
      game.start();
    }
    this.ui.appendChild(menu);
  }
}
