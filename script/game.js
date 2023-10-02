

let score = 0;

let repeat = 1000; 
let minRepeat = 300;
let intervalId = setInterval(createBubble, repeat);
const generatedChars = new Set();
document.getElementById("score").innerHTML = `Score:${score}`;
document.getElementById("score").style.fontSize = "25px ";
function getRandomChar() {
    let char;
    do {
       
        charCode = Math.floor(Math.random() * 26) + 97;
        char = String.fromCharCode(charCode);
    } while (generatedChars.has(char));
    generatedChars.add(char);
    return char;
   
}
 bubbleMap = new Map();
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 90}%`; 
    bubbleText = getRandomChar();
    bubble.textContent = bubbleText;
    bubble.style.backgroundColor = getRandomColor();
    document.querySelector(".container").appendChild(bubble);
    bubbleMap.set(bubbleText, bubble);


    bubble.addEventListener("animationiteration", function ()  {
        
        this.remove();
        const text = this.textContent;
        bubbleMap.delete(text);
        console.log("this part is running" +text);
        generatedChars.delete(text);
    });
    adjustSpeed();
}
document.addEventListener('keypress', handleKeyDown);


function getRandomColor() {
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
    let randCol = randomNumber.padStart(6, 0);
    return `#${randCol.toUpperCase()}`;

    
}
function adjustSpeed() {
    console.log(repeat);
   
    if (score % 5== 0 && score!=0) {
        repeat = Math.max(repeat - 200, minRepeat);
        clearInterval(intervalId); 
        intervalId = setInterval(createBubble, repeat); 
    }
}

function handleKeyDown(event) {
    const pressedKey = event.key;
    
    if (bubbleMap.has(pressedKey)) {
        const bubble = bubbleMap.get(pressedKey);
        bubble.remove();
        bubbleMap.delete(pressedKey);
        generatedChars.delete(pressedKey);
        score++;
        document.getElementById("score").innerHTML = `Score:${score}`;
        adjustSpeed();
               
    }
    else {
        score--;
        document.getElementById("score").innerHTML = `Score:${score}`;
    }
   

}


console.log(repeat);

