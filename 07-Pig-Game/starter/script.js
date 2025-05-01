'use strict';

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

init();
function init(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    // staring condotion
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add("hidden");
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");

};

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");

};

// rolling dice
btnRoll.addEventListener("click", function(){

    if(playing){
        // random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;


        // display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        // if roll 1, swicth to next player
        if(dice !== 1){
            // add dice to current score
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // switch to next video
            switchPlayer();
        }
    }
});


// hold btn
btnHold.addEventListener("click", function (){
    
    if(playing){

        // add cuurent score to active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check score => 100
        //finish game
        if(scores[activePlayer] >= 10){
            // finish the game
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

        } else {
            //switch player
            switchPlayer();
        }
    }
});

// resetting the game
btnNew.addEventListener("click", init);


