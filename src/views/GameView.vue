<template>
  <div id="game-board">
    <!-- Player -->
    <div id="player" class="player"></div>

    <!-- Bullets -->
    <div id="bullets"></div>

    <!-- Enemies -->
    <div id="enemies"></div>

    <!-- Scoreboard -->
    <div id="scoreboard">Score: 0</div>

    <!-- Lives -->
    <div id="lives">Lives: 3</div>
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

    let playerX = 0;
    let playerY = 0;
    let score = 0;
    let lives = 3;

    function movePlayer(x, y) {
      playerX = x;
      playerY = y;
      player.style.left = playerX + 'px';
      player.style.top = playerY + 'px';
    }

    function createBullet() {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.left = playerX + 25 + 'px';
      bullet.style.top = playerY - 5 + 'px';
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
          scoreboard.textContent = 'Score: ' + score;
        }
      });
    }

    function createEnemy() {
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.style.left = Math.random() * (gameBoard.clientWidth - 50) + 'px';
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
        enemy.style.top = enemyY + 2 + 'px';

        if (enemyY > gameBoard.clientHeight) {
          enemy.remove();
          lives--;
          livesDisplay.textContent = 'Lives: ' + lives;

          if (lives === 0) {
            endGame();
          }
        } else {
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
        livesDisplay.textContent = 'Lives: ' + lives;

        if (lives === 0) {
          endGame();
        }
      }
    }

    function endGame() {
      clearInterval(enemyInterval);
      clearInterval(bulletInterval);
      gameBoard.removeEventListener('mousemove', handleMouseMove);
      gameBoard.removeEventListener('click', handleMouseClick);
      alert('Game Over! Your final score is: ' + score);
    }

    function handleMouseMove(e) {
      movePlayer(e.clientX - gameBoard.offsetLeft, e.clientY - gameBoard.offsetTop);
    }

    function handleMouseClick() {
      createBullet();
    }

    let enemyInterval = setInterval(createEnemy, 1000);
    let bulletInterval = setInterval(moveBullets, 10);
    gameBoard.addEventListener('mousemove', handleMouseMove);
    gameBoard.addEventListener('click', handleMouseClick);
  }
}
</script>

<style>
#game-board {
  position: relative;
  width: 100vw;
  height: 92.6vh;
  background-color: #000;
  overflow: hidden;
}

.player {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  background-color: red;
  z-index: 1;
}

.bullet {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #FFF;
  border-radius: 50%;
  z-index: 2;
}

.enemy {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: blue;
  z-index: 1;
}

#scoreboard {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #FFF;
  font-size: 24px;
  z-index: 2;
}

#lives {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #FFF;
  font-size: 24px;
  z-index: 2;
}
</style>