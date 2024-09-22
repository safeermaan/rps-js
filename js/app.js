// Initialize the score from local storage or as zeros
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Function to update the score element
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to play the game
function playGame(playerMove) {
  const computerMove = pickCompMove();

  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie.';
    score.ties++; // Increment the tie count
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'You Win.';
    score.wins++;
  } else {
    result = 'You Lose.';
    score.losses++;
  }

  // Save the updated score to local storage
  localStorage.setItem('score', JSON.stringify(score));

  // Update the score element
  updateScoreElement();

  const resultElement = document.querySelector('.js-result');
  resultElement.innerHTML = result;

  const movesElement = document.querySelector('.js-moves');
  movesElement.innerHTML = `You
  <img src="img/${playerMove}-emoji.png" class="move-icon">
  <img src="img/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}

// Function to reset the score and clear the result
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  // Remove the score from local storage
  localStorage.removeItem('score');

  // Update the score element
  updateScoreElement();

  // Clear the result element
  const resultElement = document.querySelector('.js-result');
  resultElement.innerHTML = '';
}

// Function to pick the computer's move
function pickCompMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

// Initial update of the score element
updateScoreElement();
