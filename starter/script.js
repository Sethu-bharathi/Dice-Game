'use strict';
const CurrentScore = [0, 0];
const totalScore = [0, 0];
let currentPlayer = 0;

function changePlayer() {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  currentPlayer = currentPlayer == 0 ? currentPlayer + 1 : currentPlayer - 1;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
}
function addCurrentscore(number) {
  CurrentScore[currentPlayer] += number;
  document.getElementById(`current--${currentPlayer}`).textContent =
    CurrentScore[currentPlayer];
}

const roll = document.querySelector('.btn--roll');
const rollDice = () => {
  const rand = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `./dice-${rand}.png`;
  switch (rand) {
    case 1:
      changeCurrentScore(currentPlayer, 0);
      changePlayer();
      break;
    default:
      addCurrentscore(rand);
      break;
  }
};
roll.addEventListener('click', rollDice);
function changeCurrentScore(Player, score) {
  CurrentScore[Player] = score;
  document.getElementById(`current--${Player}`).textContent =
    CurrentScore[Player];
}

function changeTotalScore(Player, score) {
  totalScore[Player] = score;
  document.getElementById(`score--${Player}`).textContent = totalScore[Player];
}
function onHold() {
  console.log('clicked');
  totalScore[currentPlayer] += CurrentScore[currentPlayer];
  CurrentScore[currentPlayer] = 0;
  if (totalScore[currentPlayer] >= 100) {
    alert('Current Player wins');
  }
  changeTotalScore(
    currentPlayer,
    totalScore[currentPlayer] + CurrentScore[currentPlayer]
  );
  changeCurrentScore(currentPlayer, 0);
  changePlayer();
}

const hold = document.querySelector('.btn--hold');
hold.addEventListener('click', onHold);

function reset() {
  console.log('new clicked');
  for (let i = 0; i < 2; i++) {
    changeTotalScore(i, 0);
    changeCurrentScore(i, 0);
  }
}
const newGame = document.querySelector('.btn--new');
newGame.addEventListener('click', reset);
