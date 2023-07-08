<template>
  <div id="game-board">
    <div id="player" class="player"></div>
    <div id="bullets"></div>
    <div id="enemies"></div>
    <div id="scoreboard">점수: 0</div>
    <div id="lives">목숨: 3</div>
    <div id="game-board" class="game-running">
      <button id="stop-button">멈추기</button>
      <button id="rapid-fire-button">연사</button>
      <button id="theme-toggle-button">테마 변경</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const gameBoard = document.getElementById('game-board');
    const player = document.getElementById('player');
    const bulletsContainer = document.getElementById('bullets');
    const enemiesContainer = document.getElementById('enemies');
    const scoreboard = document.getElementById('scoreboard');
    const livesDisplay = document.getElementById('lives');
    const stopButton = document.getElementById('stop-button');
    const rapidFireButton = document.getElementById('rapid-fire-button');
    const themeToggleButton = document.getElementById('theme-toggle-button');

    let playerX = 0;
    let playerY = 0;
    let score = 0;
    let lives = 3;
    let isGameRunning = true;
    let isRapidFireEnabled = false;
    let currentTheme = 'theme-light';

    function movePlayer(x, y) {
      playerX = x;
      playerY = y;
      player.style.left = playerX + 'px';
      player.style.top = playerY + 'px';
    }

    function createBullet() {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.left = playerX + (player.offsetWidth - bullet.offsetWidth) / 2 + 'px';
      bullet.style.top = playerY - bullet.offsetHeight / 2 + 'px';
      bulletsContainer.appendChild(bullet);
    }

    function moveBullets() {
      const bullets = bulletsContainer.querySelectorAll('.bullet');
      bullets.forEach(bullet => {
        const bulletY = parseInt(bullet.style.top);
        bullet.style.top = bulletY - 5 + 'px';

        if (bulletY < 0) {
          bullet.remove();
        } else {
          checkBulletCollision(bullet);
        }
      });
    }

    function checkBulletCollision(bullet) {
      const enemies = enemiesContainer.querySelectorAll('.enemy');
      enemies.forEach(enemy => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top) {
          bullet.remove();
          enemy.remove();
          score += 10;
          scoreboard.textContent = '점수: ' + score;
        }
      });
    }

    function createEnemy() {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.style.left = Math.random() * (gameBoard.clientWidth - enemy.offsetWidth) + 'px';
      enemy.style.top = '0px';

      if (!isColliding(enemy)) {
        enemiesContainer.appendChild(enemy);
      }
    }

    function isColliding(element) {
      const enemies = enemiesContainer.querySelectorAll('.enemy');
      const elementRect = element.getBoundingClientRect();

      for (let i = 0; i < enemies.length; i++) {
        const enemyRect = enemies[i].getBoundingClientRect();
        if (elementRect.left < enemyRect.right &&
            elementRect.right > enemyRect.left &&
            elementRect.top < enemyRect.bottom &&
            elementRect.bottom > enemyRect.top) {
          return true;
        }
      }

      return false;
    }

    function moveEnemies() {
      const enemies = enemiesContainer.querySelectorAll('.enemy');
      enemies.forEach(enemy => {
        const enemyY = parseInt(enemy.style.top);
        const enemyX = parseInt(enemy.style.left);
        enemy.style.top = enemyY + 1 + 'px';

        if (enemyY > gameBoard.clientHeight) {
          enemy.remove();
          lives--;
          livesDisplay.textContent = '목숨: ' + lives;

          if (lives === 0) {
            endGame();
          }
        } else {
          if (enemyX <= 0 || enemyX >= gameBoard.clientWidth - enemy.offsetWidth) {
            enemy.direction = -enemy.direction;
          }
          enemy.style.left = enemyX + enemy.direction + 'px';
          checkPlayerCollision(enemy);
        }
      });
    }

    function checkPlayerCollision(enemy) {
      const playerRect = player.getBoundingClientRect();
      const enemyRect = enemy.getBoundingClientRect();

      if (playerRect.left < enemyRect.right &&
          playerRect.right > enemyRect.left &&
          playerRect.top < enemyRect.bottom &&
          playerRect.bottom > enemyRect.top) {
        enemy.remove();
        lives--;
        livesDisplay.textContent = '목숨: ' + lives;

        if (lives === 0) {
          endGame();
        }
      }
    }

    function endGame() {
      isGameRunning = false;
      stopButton.disabled = true;
      rapidFireButton.disabled = true;
      themeToggleButton.disabled = true;
      gameBoard.classList.add('game-ended');
      gameBoard.insertAdjacentHTML('beforeend', '<div class="game-over-text">게임 종료! 최종 점수: ' + score + '</div>');
    }


    function toggleTheme() {
      gameBoard.classList.toggle('theme-light');
      gameBoard.classList.toggle('theme-dark');
      currentTheme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
    }

    function handleKeyDown(event) {
      if (!isGameRunning) return;

      switch (event.key) {
        case 'ArrowUp':
          movePlayer(playerX, playerY - 20);
          break;
        case 'ArrowDown':
          movePlayer(playerX, playerY + 20);
          break;
        case 'ArrowLeft':
          movePlayer(playerX - 20, playerY);
          break;
        case 'ArrowRight':
          movePlayer(playerX + 20, playerY);
          break;
        case ' ':
          createBullet();
          break;
      }
    }


    function handleStopButtonClick() {
      if (isGameRunning) {
        isGameRunning = false;
        stopButton.textContent = '재개하기';
        gameBoard.classList.remove('game-running');
        gameBoard.classList.add('game-paused');
      } else {
        isGameRunning = true;
        stopButton.textContent = '멈추기';
        gameBoard.classList.remove('game-paused');
        gameBoard.classList.add('game-running');
      }
    }


    function handleRapidFireButtonClick() {
      isRapidFireEnabled = !isRapidFireEnabled;
      rapidFireButton.textContent = isRapidFireEnabled ? '연사 중지' : '연사';
    }

    function handleThemeToggleButton() {
      toggleTheme();
    }

    document.addEventListener('keydown', handleKeyDown);
    stopButton.addEventListener('click', handleStopButtonClick);
    rapidFireButton.addEventListener('click', handleRapidFireButtonClick);
    themeToggleButton.addEventListener('click', handleThemeToggleButton);

    setInterval(() => {
      if (!isGameRunning) return;
      moveBullets();
      moveEnemies();
      if (isRapidFireEnabled) {
        createBullet();
      }
    }, 20);

    setInterval(() => {
      if (!isGameRunning) return;
      createEnemy();
    }, 2000);
  }
}
</script>

<style>
:root {
  --size: 5rem;
  --bullet-size: 1rem;
}

#game-board {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

.player {
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: calc(50% - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  background-color: red;
  border-radius: 50%;
  z-index: 1;
}

.bullet {
  position: absolute;
  width: var(--bullet-size);
  height: var(--bullet-size);
  background-color: #FFF;
  border-radius: 50%;
  z-index: 2;
}

.enemy {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: blue;
  border-radius: 50%;
  z-index: 1;
}

#scoreboard {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #FFF;
  font-size: 2.4rem;
  z-index: 2;
}

#lives {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #FFF;
  font-size: 2.4rem;
  z-index: 2;
}

.theme-light {
  background-color: #FFF;
  color: #000;
}

.theme-dark {
  background-color: #000;
  color: #FFF;
}

#game-board.game-running .enemy {
  animation-play-state: running;
}

#game-board.game-paused .enemy {
  animation-play-state: paused;
  filter: blur(2px);
}

#game-board.game-ended {
  pointer-events: none;
}

#game-board.game-ended .game-over-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: red;
  text-align: center;
}
</style>