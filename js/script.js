document.getElementById("btn").addEventListener("click", navigate, true);
let gameStartSound = new Audio("../sounds/mouse-click-153941.mp3");
// import { animate } from "./game.js";
function navigate() {
  gameStartSound.play();
  // animate();
  window.location.href = "./game_screen.html";
}
let str = "Welcome to Type-Blast";
const heading = document.getElementsByClassName("heading");
heading[0].innerHTML = "";
let i = 0;
const init = setInterval(() => {
  if (i <= str.length) {
    heading[0].innerHTML = str.substring(0, i);
    i++;
  } else {
    clearInterval(init);
  }
}, 100);
// document.getElementById("score").innerHTML = `Score: ${score}`;
// document.getElementById("score").style.fontSize = "25px";
