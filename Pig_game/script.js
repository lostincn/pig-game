'use strict';
//selecting ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
// REMEMBER чтобы выбрать АЙДИ, можно использовать два этих способа

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let playing;
let scores;
let currentScore;
let activePlayer;
const btnRoll = document.querySelector('.btn--roll');
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  score0El.textContent = Number(0);
  score1El.textContent = Number(0);
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const btnRollFunc = function () {
  if (playing) {
    //1/ Generate Random Dice Roll
    const diceRandom = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRandom);
    //2 Display Dice
    diceEl.classList.remove('hidden');
    // тут мы меняем цифру картинки просто через код подбора цифр, который у нас будет выходить из diceRandom
    diceEl.src = `dice-${diceRandom}.png`;
    // 3 Check for rolled if it true add to current score
    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //change later
    } else {
      //if it is 1  switch to next player
      switchPlayer();

      //active player is = 0 but if active player get's 1 or presses hold, it will go to another active player!
      // document
      //   .getElementById(`current--${activePlayer}`)
      //   .remove('active--player');
    }
  }
};

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
//функция для кнопки сохранения счёта
const btnHoldFunc = function () {
  //1. Add the current score to the score of the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent =
      Number('0');
    //2. Check if the score is >= 100 finish the game
    //2. Change the active player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      diceEl.classList.add('hidden');
      // document.getElementById(
      //   `name--${activePlayer}`
      // ).textContent = `Игрок Победил!`;
    } else {
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // document;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      // currentScore = 0;
      switchPlayer();
    }
    //3. Start again from 0
  }
};
//функция для смены игрока Используется в двух местах - при достижении однёрки и при сохранении числа
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  document;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
};
// ROLL DICE Functionality
btnRoll.addEventListener('click', btnRollFunc);
// document.addEventListener('keydown', function (e) {
//   if (e.key === `Enter`) {
//     btnRollFunc();
//   }
// });
btnHold.addEventListener('click', btnHoldFunc);
// document.addEventListener('keydown', function (e) {
//   if (e.key === `Enter`) {
//     btnHoldFunc();
//   }
// });
btnNew.addEventListener('click', init);
