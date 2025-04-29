'use strict';

/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "Correct Number ";
console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 40; 

document.querySelector(".guess").value = 69;
*/
let guess;
let secretNumber =  Math.trunc(Math.random() * 20) + 1;
let currentScore = 20;
let highScore = 0;


const displayMessage = function(message){
    document.querySelector(".message").textContent = message;
}

document.querySelector(".check").addEventListener("click", function(){

    guess = Number(document.querySelector(".guess").value);

    if(currentScore <=0){
        displayMessage("😭 You loose MOTHERFUCKER");
        return;
    }
    if(!guess){                             // no input
        displayMessage("🤬 Guess Something MOTHERFUCKER");
        return;
    } else if(guess === secretNumber){      // Win

        document.querySelector(".number").textContent = secretNumber;
        displayMessage("🎉Correct Guess! MOTHERFUCKER");
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "100rem";

        if(highScore < currentScore){
            highScore = currentScore;
            document.querySelector(".highscore").textContent = highScore;
        }

    } else if( guess !== secretNumber){
        displayMessage((guess > secretNumber) ? "📈 Too high! MOTHERFUCKER" : "📉 Too low! MOTHERFUCKER");
        currentScore--;
        document.querySelector(".score").textContent = currentScore; 
    }

});


document.querySelector(".again").addEventListener("click", () => {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    currentScore = 20;
    displayMessage("Trying Again, MOTHERFUCKER");
    document.querySelector(".score").textContent = String(currentScore);
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
});



