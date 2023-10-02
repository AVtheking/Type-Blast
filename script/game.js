const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

let score = 0;
const maxbubbles=10
let speed = 0.5;
let maxSpeed = 6;
const generatedChars = new Set();
let minRepeat = 300;
let repeat = 2000;
let intervalId = setInterval(createBubble, repeat);


document.getElementById("score").innerHTML = `Score: ${score}`;
document.getElementById("score").style.fontSize = "25px";
document.getElementById("score").style.color = "white";

bubbleMap = new Map();

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
       
        charCode = Math.floor(Math.random() * 26) + 97;
        char = String.fromCharCode(charCode);
    } while (generatedChars.has(char));
    generatedChars.add(char);
    return char;
   
}
function adjustSpeed() {
  if (score % 5 == 0 && score != 0) {
      speed = Math.min(speed+0.05, maxSpeed);
      repeat = Math.max(repeat - 500, minRepeat);
      clearInterval(intervalId); 
      intervalId = setInterval(createBubble, repeat); 
  }
}

function createBubble() {
    if (bubbleMap.size < maxbubbles) {
        const bubbleText = getRandomChar();
        const radius = 25;
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
      ctx.fillStyle = getRandomColor()
          ;
    ctx.fill();
    ctx.fillStyle = "#fff"; 
    ctx.font = "20px Arial"; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(key, x, y);
  });
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbleMap.forEach((bubble, key) => {
    if (bubble.y - bubble.radius > 0) {
      bubble.y -= speed; 
    } else {
      bubbleMap.delete(key);
      generatedChars.delete(key);
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

animate();
setInterval(createBubble, repeat);
