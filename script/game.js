
// let score = 50;
// document.getElementById("p1").innerHTML = `Score: ${score}`;
// document.getElementById("p1").style.fontSize = "25px";
let score = 0;
document.getElementById("score").innerHTML = `Score:${score}`;
document.getElementById("score").style.fontSize = "25px ";
function getRandomChar() {
   
    charCode = Math.floor(Math.random() * 26) + 97;
    // console.log(String.fromCharCode(charCode))
    // console.log(charCode);
    return String.fromCharCode(charCode);
}
 bubbleMap = new Map();
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 70}%`; 
    bubbleText = getRandomChar();
    bubble.textContent = bubbleText;
    // bubbleMap[char] = bubble;
    // console.log(getRandomChar());    
    bubble.style.backgroundColor = getRandomColor();
    document.querySelector(".container").appendChild(bubble);
    bubbleMap.set(bubbleText, bubble);

    bubble.addEventListener("animationiteration", () => {
        
        bubble.remove();
        bubbleMap.delete(bubbleText);
    });
}
document.addEventListener('keypress', handleKeyDown);

function getRandomColor() {
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
    let randCol = randomNumber.padStart(6, 0);
    return `#${randCol.toUpperCase()}`;

    
}
// let bubbleMap=new Map()
function handleKeyDown(event) {
    const pressedKey = event.key;
    // const bubbles = document.querySelectorAll('.bubble');


   
    
    if (bubbleMap.has(pressedKey)) {
        const bubble = bubbleMap.get(pressedKey);
        bubble.remove();
            bubbleMap.delete(pressedKey);
        score++;
        document.getElementById("score").innerHTML = `Score:${score}`;
               
    }
    else {
        score--;
        document.getElementById("score").innerHTML = `Score:${score}`;
    }

}
let repeat = 2000;
if (score % 2== 0) {
    repeat -= 500;
}

setInterval(createBubble, repeat);
