import Particle from "./Particle.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//variables
let myScore = document.getElementById("score");
let endScore = document.getElementById("endScore");
let score = 0;
const maxbubbles = 20;
let speed = 0.7;
let maxSpeed = 5;
const generatedChars = new Set();
let minRepeat = 300;
let repeat = 1500;
let intervalId = setInterval(createBubble, repeat);
var hearts = document.getElementsByClassName("hearts");
let health = 10;
let heading = document.getElementById("head-2");
let isPaused = false;
let gameEnd = false;

//sounds
let sound = new Audio("../sounds/wronganswer-37702.mp3");
let gameOverSound = new Audio("../sounds/negative_beeps-6008.mp3");
let popSound = new Audio("../sounds/pop-39222.mp3");
let gameStartSound = new Audio("../sounds/mouse-click-153941.mp3");

myScore.innerHTML = `Score: ${score}`;
myScore.style.fontSize = "25px";
myScore.style.color = "white";
myScore.style.marginLeft = "1vw";
let id;
const particles = [];
const bubbleMap = new Map();
const scoreMap = new Map();

function triggerExplosion(x, y) {
  for (let i = 0; i < 30; i++) {
    const radius = Math.random() * 2 + 1;
    const color = getRandomColor();
    const dx = (Math.random() - 0.5) * 3;
    const dy = (Math.random() - 0.5) * 3;

    particles.push(new Particle(x, y, radius, color, dx, dy));
  }
}

function damage() {
  health--;
  // console.log(health);
  if (health == 8) {
    hearts[0].style.opacity = 0;
  }
  if (health == 6) {
    hearts[1].style.opacity = 0;
  }
  if (health == 4) {
    hearts[2].style.opacity = 0;
  }
  if (health == 2) {
    hearts[3].style.opacity = 0;
  }
  if (health == 0) {
    hearts[4].style.opacity = 0;
    gameOver();
  }
}

function getRandomColor() {
  let maxVal = 0xffffff;
  let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
  let randCol = randomNumber.padStart(6, 0);
  return `#${randCol.toUpperCase()}`;
}

function getRandomChar() {
  let char;
  do {
    let charCode = Math.floor(Math.random() * 26) + 97;
    char = String.fromCharCode(charCode);
  } while (generatedChars.has(char));
  generatedChars.add(char);
  return char;
}

function adjustSpeed() {
  if (score % 5 == 0 && score != 0 && !scoreMap.has(score)) {
    scoreMap.set(score, 1);
    speed = Math.min(speed + 0.07, maxSpeed);
    repeat = Math.max(repeat - 250, minRepeat);
    clearInterval(intervalId);
    intervalId = setInterval(createBubble, repeat);
  }
}

function createBubble() {
  if (bubbleMap.size < maxbubbles) {
    const bubbleText = getRandomChar();
    const radius = 20;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = canvas.height + radius;

    bubbleMap.set(bubbleText, { x, y, radius });

    adjustSpeed();
  }
}

function drawBubbles() {
  bubbleMap.forEach((bubble, key) => {
    const { x, y, radius } = bubble;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();

    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(key, x, y);
  });
}

document.addEventListener("keypress", handleKeyDown);

function handleKeyDown(event) {
  if (health == 0) {
    return;
  }

  const pressedKey = event.key;
  if (pressedKey == " " || isPaused) {
    return;
  }

  if (bubbleMap.has(pressedKey)) {
    const bubble = bubbleMap.get(pressedKey);
    popSound.pause();
    popSound.currentTime = 0;
    popSound.play();
    bubbleMap.delete(pressedKey);
    generatedChars.delete(pressedKey);
    score++;
    document.getElementById("score").innerHTML = `Score: ${score}`;
    adjustSpeed();
    triggerExplosion(bubble.x, bubble.y);
  } else {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    score = Math.max(score - 1, 0);
    console.log(score);
    document.getElementById("score").innerHTML = `Score: ${score}`;
  }
}
document.addEventListener("keydown", function (event) {
  if ((event.key == " " || event.code == "Space") && gameEnd == false) {
    isPaused = !isPaused;
    if (isPaused) {
      cancelAnimationFrame(id);
      canvas.style.display = "none";
      gameOverScreen.style.display = "block";
      heading.innerHTML = "Game Paused";
      endScore.innerHTML = `Your Score: ${score}`;
      endScore.style.fontSize = "35px";
      endScore.style.color = "#fff";
      const resumeBtn = document.getElementById("restartButton");
      resumeBtn.innerText = "Resume";
      resumeBtn.addEventListener("click", () => {
        gameStartSound.play();
        isPaused = false;
        canvas.style.display = "block";
        gameOverScreen.style.display = "none";
        clearInterval(intervalId);
        intervalId = setInterval(createBubble, repeat);
        animate();
      });
    } else {
      canvas.style.display = "block";
      gameOverScreen.style.display = "none";
      animate();
    }
  }
});
function animate() {
  if (!isPaused && !gameEnd) {
    id = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(speed);
    console.log(repeat);
    particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        particle.update();
      }
    });

    bubbleMap.forEach((bubble, key) => {
      if (bubble.y - bubble.radius > 0) {
        bubble.y -= speed;
      } else {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
        bubbleMap.delete(key);
        generatedChars.delete(key);
        damage();
      }
    });
    if (health == 0) {
      cancelAnimationFrame(id);
    }

    drawBubbles();
  }
}
function gameOver() {
  gameEnd = true;

  cancelAnimationFrame(id);
  gameOverSound.play();
  canvas.style.display = "none";
  gameOverScreen.style.display = "block";
  heading.innerHTML = "Game Over";
  myScore.innerHTML = "";
  endScore.innerHTML = `Your Score: ${score}`;
  endScore.style.fontSize = "35px";
  endScore.style.color = "#fff";
  const restartButton = document.getElementById("restartButton");
  restartButton.innerText = "Restart";
  restartButton.addEventListener("click", () => {
    scoreMap.clear();

    gameEnd = false;
    gameStartSound.play();
    health = 10;
    score = 0;
    myScore.innerHTML = `Score: ${score}`;
    bubbleMap.clear();
    generatedChars.clear();
    canvas.style.display = "block";
    gameOverScreen.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts[0].style.opacity = 1;
    hearts[1].style.opacity = 1;
    hearts[2].style.opacity = 1;
    hearts[3].style.opacity = 1;
    hearts[4].style.opacity = 1;
    speed = 0.7;
    repeat = 1500;
    clearInterval(intervalId);
    intervalId = setInterval(createBubble, repeat);
    animate();
  });
}
animate();
