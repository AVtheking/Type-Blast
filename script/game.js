
// let score = 50;
// document.getElementById("p1").innerHTML = `Score: ${score}`;
// document.getElementById("p1").style.fontSize = "25px";
function getRandomChar() {
   
    charCode = Math.floor(Math.random() * 26) + 97;
    // console.log(String.fromCharCode(charCode))
    console.log(charCode);
    return String.fromCharCode(charCode);
}
function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 70}%`; 
    bubble.textContent = getRandomChar();
    console.log(getRandomChar());    
    bubble.style.backgroundColor = getRandomColor();
    document.querySelector(".container").appendChild(bubble);

    bubble.addEventListener("animationiteration", () => {
        
        bubble.remove();
    });
}

function getRandomColor() {
    let maxVal = 0xFFFFFF; 
    let randomNumber = Math.floor(Math.random() * maxVal).toString(16);
    let randCol = randomNumber.padStart(6, 0);
    return `#${randCol.toUpperCase()}`;

    
}

setInterval(createBubble, 2000);
