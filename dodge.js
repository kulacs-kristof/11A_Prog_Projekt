let backgroundPositionX = 0;
let backgroundPositionY = 0;
let startTime;
let timerElement = document.querySelector("#timer");
let difficulty = "hard";
let speed = 10;
let alertShown = false;
let alertShown2 = false;

function timerElementChange() {
  timerElement.style.position = "absolute";
  timerElement.style.top = "10px";
  timerElement.style.left = "40%";
  timerElement.style.transform.translateX = "(-50%)";
  timerElement.style.fontSize = "30px";
  timerElement.style.color = "black";
}

timerElementChange();

function updateBackgroundPosition() {
  document.body.style.backgroundPositionX = backgroundPositionX + "px";
  document.body.style.backgroundPositionY = backgroundPositionY + "px";
}
const keysPressed = {};

window.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true;
});

window.addEventListener("keyup", (event) => {
  keysPressed[event.key] = false;
});

function handleContinuousMovement() {
  if (
    (keysPressed["a"] || keysPressed["d"]) &&
    (keysPressed["w"] || keysPressed["s"])
  ) {
    (speed = 7), 5;
  }

  if (keysPressed["a"]) {
    backgroundPositionX += speed;
  }
  if (keysPressed["d"]) {
    backgroundPositionX -= speed;
  }
  if (keysPressed["w"]) {
    backgroundPositionY += speed;
  }
  if (keysPressed["s"]) {
    backgroundPositionY -= speed;
  }

  updateBackgroundPosition();
  updateTimer();
}

setInterval(handleContinuousMovement, 16);

let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;

const player = document.getElementById("player");
player.style.left = playerX + "px";
player.style.top = playerY + "px";

function updatePlayerPosition() {
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = (currentTime - startTime) / 1000;

  const formattedTime = elapsedTime.toFixed(2);
  timerElement.textContent = `Time elapsed: ${formattedTime} seconds`;
}

function gameOver() {
  for (const enemy of enemies) {
    const playerInfluencedX = playerX - backgroundPositionX;
    const playerInfluencedY = playerY - backgroundPositionY;

    const distance = Math.sqrt(
      Math.pow(enemy.x - playerInfluencedX, 2) +
        Math.pow(enemy.y - playerInfluencedY, 2)
    );

    if (distance < 20) {
      window.location.href = "index.html";
      if (!alertShown) {
        window.alert("Meghaltál");
        alertShown = true;
      }
    }
  }
}

class Enemy {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("enemy");
    document.body.appendChild(this.element);

    const spawnSide = Math.floor(Math.random() * 4);

    switch (spawnSide) {
      case 0:
        this.x = Math.random() * window.innerWidth;
        this.y = -20;
        break;
      case 1:
        this.x = window.innerWidth + 20;
        this.y = Math.random() * window.innerHeight;
        break;
      case 2:
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + 20;
        break;
      case 3:
        this.x = -20;
        this.y = Math.random() * window.innerHeight;
        break;
    }

    this.updateEnemyPosition();
  }

  updateEnemyPosition() {
    this.element.style.left = this.x + backgroundPositionX + "px";
    this.element.style.top = this.y + backgroundPositionY + "px";
  }

  homeTowardsPlayer() {
    const speedEnemy = 5;

    const playerInfluencedX = playerX - backgroundPositionX;
    const playerInfluencedY = playerY - backgroundPositionY;

    const angle = Math.atan2(
      playerInfluencedY - this.y,
      playerInfluencedX - this.x
    );
    this.x += Math.cos(angle) * speedEnemy;
    this.y += Math.sin(angle) * speedEnemy;

    this.updateEnemyPosition();
  }
}

const enemies = [];

function spawnEnemy() {
  enemies.push(new Enemy());
}

function setDifficulty(difficultyLevel) {
  difficulty = difficultyLevel;
  switch (difficulty) {
    case "easy":
      for (let i = 0; i < 10; i++) {
        spawnEnemy();
      }
      break;
    case "medium":
      for (let i = 0; i < 25; i++) {
        spawnEnemy();
      }
      break;
    case "hard":
      for (let i = 0; i < 50; i++) {
        spawnEnemy();
      }
      break;
    default:
      console.error("Invalid difficulty level");
  }
}

setDifficulty(difficulty);

function handleEnemyMovement() {
  for (const enemy of enemies) {
    enemy.homeTowardsPlayer();
  }
  gameOver();
}

function YouWin() {
  if (!alertShown) {
    window.alert("Nyertél! Túléltél 5 másodpercet");
    alertShown = true;
  }
  window.location.href = "index.html";
}

function countSeconds() {
  let seconds = 0;

  const intervalId = setInterval(function () {
    seconds++;
    console.log(seconds + " seconds have passed.");

    if (seconds === 5) {
      YouWin();
      clearInterval(intervalId);
    }
  }, 1000);
}

countSeconds();

startTime = Date.now();
setInterval(spawnEnemy, 1000);
setInterval(handleEnemyMovement, 16);
