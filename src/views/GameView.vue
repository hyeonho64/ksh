<template>
  <div id="title-screen">
    <h1 style="font-weight: bold;">ksh 슈팅 게임</h1>
    <p>환영합니다! 게임을 시작하려면 아래의 설정을 완료해주세요.</p>
    <label for="player-color-input">플레이어 색상:</label>
    <input type="color" id="player-color-input">
    <br>
    <label for="enemy-color-input">적 색상:</label>
    <input type="color" id="enemy-color-input">
    <br>
    <button id="start-button">시작하기</button>
  </div>

  <div id="game-board" class="game-ended">
    <div id="player" class="player"></div>
    <div id="bullets"></div>
    <div id="enemies"></div>
    <div id="scoreboard">점수: 0</div>
    <div id="lives">목숨: 3</div>
    <div id="game-controls">
      <button id="stop-button">멈추기</button>
      <button id="rapid-fire-button">연사</button>
      <button id="theme-toggle-button">테마 변경</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const titleScreen = document.getElementById('title-screen');
    const startButton = document.getElementById('start-button');
    const gameBoard = document.getElementById('game-board');
    const player = document.getElementById('player');
    const bulletsContainer = document.getElementById('bullets');
    const enemiesContainer = document.getElementById('enemies');
    const scoreboard = document.getElementById('scoreboard');
    const livesDisplay = document.getElementById('lives');
    const stopButton = document.getElementById('stop-button');
    const rapidFireButton = document.getElementById('rapid-fire-button');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    let gameOverScreen;
    let finalScore;

    let playerX = 0;
    let playerY = 0;
    let score = 0;
    let lives = 3;
    let isGameRunning = false;
    let isRapidFireEnabled =true;
    let currentTheme = 'theme-light';
    let playerColor = '#ff4d4d';
    let enemyColor = '#007bff';

    function applySettings() {
      player.style.backgroundColor = playerColor;
      enemyColor = enemyColor;
    }

    function handleStartButtonClick() {
      titleScreen.style.display = 'none';
      gameBoard.classList.remove('game-ended');
      isGameRunning = true;
    }

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
      finalScore = score;
      gameBoard.insertAdjacentHTML('beforeend', '<div class="game-over-text">게임 종료! 최종 점수: ' + finalScore + '</div>');
      gameOverScreen = document.getElementById('game-over-screen');
      const restartButton = document.getElementById('restart-button');
      restartButton.addEventListener('click', handleRestartButtonClick);
      gameOverScreen.style.display = 'block';
      document.getElementById('final-score').textContent = finalScore;
    }

    function handleRestartButtonClick() {
      gameBoard.classList.remove('game-ended');
      gameOverScreen.style.display = 'none';
      resetGame();
      startGame();
    }

    function resetGame() {
      playerX = 0;
      playerY = 0;
      score = 0;
      lives = 3;
      isGameRunning = false;
      isRapidFireEnabled = false;
      bulletsContainer.innerHTML = '';
      enemiesContainer.innerHTML = '';
      scoreboard.textContent = '점수: 0';
      livesDisplay.textContent = '목숨: 3';
      stopButton.disabled = false;
      rapidFireButton.disabled = false;
      themeToggleButton.disabled = false;
    }

    function startGame() {
      isGameRunning = true;
      gameBoard.classList.add('game-running');
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
    startButton.addEventListener('click', handleStartButtonClick);
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

    const playerColorInput = document.getElementById('player-color-input');
    playerColorInput.addEventListener('input', () => {
      playerColor = playerColorInput.value;
      applySettings();
    });

    const enemyColorInput = document.getElementById('enemy-color-input');
    enemyColorInput.addEventListener('input', () => {
      enemyColor = enemyColorInput.value;
      applySettings();
    });

    applySettings();
  }
}
</script>

<style>

:root {
  --size: 5rem;
  --bullet-size: 1rem;
  --theme-color: #ffffff;
  --player-color: #ff4d4d;
  --bullet-color: #ffffff;
  --enemy-color: #007bff;
  --game-over-color: #ff4d4d;
  --font-size: 2.4rem;
  --small-font-size: 1.4rem;
  --border-radius: 50%;
  --blur-filter: blur(2px);
}

#title-screen {
  font-family: Pretendard-Regular;
  text-align: center;
  padding: 2rem;
}

#title-screen h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

#title-screen p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
}

#title-screen label {
  font-size: 1.4rem;
  margin-right: 0.5rem;
}

#game-board {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: var(--theme-background);
  overflow: hidden;
}

.player {
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: calc(50% - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  background-color: var(--player-color);
  border-radius: var(--border-radius);
  z-index: 1;
}

.bullet {
  position: absolute;
  width: var(--bullet-size);
  height: var(--bullet-size);
  background-color: var(--bullet-color);
  border-radius: var(--border-radius);
  z-index: 2;
}

.enemy {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: var(--enemy-color);
  border-radius: var(--border-radius);
  z-index: 1;
}

#scoreboard,
#lives {
  position: absolute;
  top: 1rem;
  margin: 1rem;
  color: var(--scoreboard-color);
  font-size: var(--font-size);
  z-index: 2;
}

#lives {
  right: 1rem;
}

#game-controls {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

button {
  font-size: var(--small-font-size);
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--theme-color);
  color: var(--theme-background);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.game-ended {
  pointer-events: none;
}

.game-over-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size);
  color: var(--game-over-color);
  text-align: center;
}

.theme-light {
  --theme-background: #ffffff;
  --theme-color: #000000;
  --player-color: #ff4d4d;
  --bullet-color: #ffffff;
  --enemy-color: #007bff;
  --game-over-color: #ff4d4d;
  --scoreboard-color: #000000;
}

.theme-dark {
  --theme-background: #000000;
  --theme-color: #ffffff;
  --player-color: #ff4d4d;
  --bullet-color: #ffffff;
  --enemy-color: #007bff;
  --game-over-color: #ff4d4d;
  --scoreboard-color: #ffffff;
}

@media (max-width: 768px) {
  #game-board {
    height: 25rem;
  }

  .player,
  .enemy {
    width: 4rem;
    height: 4rem;
  }

  #scoreboard,
  #lives {
    font-size: var(--small-font-size);
  }
}

#game-board.game-running .enemy {
  animation-play-state: running;
}

#game-board.game-paused .enemy {
  animation-play-state: paused;
  filter: var(--blur-filter);
}
</style>