'use strict';
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

let scores, activePlayer, currentScore, playing;

const init = function () {
    diceEl.classList.add('hidden');

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();
btnRoll.addEventListener('click', function () {
    console.log(playing)
    if (playing) {
        // Generate Random Dice Roll
        let dice = Math.trunc(Math.random() * 6) + 1;

        // Display Dice Roll to the Player
        diceEl.classList.remove('hidden');
        diceEl.src = `./dice-${dice}.png`;

        // Check rolled dice is it 1 or not
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch the Player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);