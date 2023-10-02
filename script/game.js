const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// ctx.imageSmoothingEnabled = false;
let myScore = document.getElementById("score");
let endScore = document.getElementById("endScore");

let score = 0;
const maxbubbles = 10;
var speed = 2;
let maxSpeed = 6;
const generatedChars = new Set();
let minRepeat = 300;
let repeat = 2000;
let intervalId = setInterval(createBubble, repeat);
var hearts = document.getElementsByClassName("hearts");
let health = 10;
myScore.innerHTML = `Score: ${score}`;
myScore.style.fontSize = "25px";
myScore.style.color = "white";
myScore.style.marginLeft = "1vw";

const bubbleMap = new Map();

function damage() {
  health--;
  console.log(health);
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
    gameOver(score);
  }
}
function getRandomColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
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
  if (score % 5 == 0 && score != 0) {
    speed = Math.min(speed + 0.05, maxSpeed);
    repeat = Math.max(repeat - 500, minRepeat);
    clearInterval(intervalId);
    intervalId = setInterval(createBubble, repeat);
  }
}

function createBubble() {
  if (bubbleMap.size < maxbubbles) {
    const bubbleText = getRandomChar();
    const radius = 20;
    const x = Math.random() * (canvas.width - radius);
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

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(speed);
  console.log(score);
  bubbleMap.forEach((bubble, key) => {
    if (bubble.y - bubble.radius > 0) {
      bubble.y -= speed;
    } else {
      bubbleMap.delete(key);
      generatedChars.delete(key);
      damage();
    }
  });

  drawBubbles();
}

document.addEventListener("keypress", handleKeyDown);

function handleKeyDown(event) {
  const pressedKey = event.key;

  if (bubbleMap.has(pressedKey)) {
    bubbleMap.delete(pressedKey);
    generatedChars.delete(pressedKey);
    score++;
    document.getElementById("score").innerHTML = `Score: ${score}`;
    adjustSpeed();
  } else {
    score--;
    document.getElementById("score").innerHTML = `Score: ${score}`;
  }
}
function gameOver(score) {
  canvas.style.display = "none";
  gameOverScreen.style.display = "block";
  myScore.innerHTML = "";
  endScore.innerHTML = `Your Score:${score}`;
  endScore.style.fontSize = "25px";
  endScore.style.color = "#fff";
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", () => {
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
    speed = 1;
    repeat = 2000;
    clearInterval(intervalId);
    intervalId = setInterval(createBubble, repeat);
    animate();
  });
}
animate();
// setInterval(createBubble, repeat);
