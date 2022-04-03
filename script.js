// Element selection
const resultText = document.querySelector('.results');
const scoreText = document.querySelector('.scoreboard');
const finalResultText = document.querySelector('.finalResult');
const scores = document.querySelectorAll('.score');

// Calculate computer choice
function computerPlay () {
  let ranNum = Math.floor(Math.random() * 3);
  return (ranNum === 0) ? 'rock' : (ranNum === 1) ? 'paper' : 'scissors';
}

// Reset game
function resetGame () {
  if (gameEnded) {
    computerScore = 0;
    humanScore = 0;
    gameEnded = false;
    scores.forEach(score => {
      score.textContent = 0;
    })
    finalResultText.textContent = '';
    resetButton.style.display = "block";
    const resultBanner = document.querySelector(".resultBanner");
    resultBanner.style.backgroundColor = '#1a1a1d';
    resultText.textContent = '';
    resetButton.style.display = 'none';
  }
}

// Remove trnasition based on applied transition class
function removeTransition (e) {
  console.log('removing transition');
  console.log(e.target.classList[1]);
  if (e.propertyName !== 'background-color') return;
  switch (e.target.classList[1]) {
    case 'loss-bkgd':
      e.target.classList.remove('loss-bkgd');
      console.log('removing red background');
    case 'win-bkgd':
      e.target.classList.remove('win-bkgd');
      console.log('removing green background');
    case 'tie-bkgd':
      e.target.classList.remove('tie-bkgd');
      console.log('removing grey background');
  }
}

// Change result banner background color depending on results
function roundResultTransition (roundResult) {
  const resultBanner = document.querySelector(".resultBanner");
  switch (roundResult) {
    case 'tie':
    resultBanner.style.backgroundColor = '#333333';
    // resultBanner.classList.add('tie-bkgd');
    console.log('made background grey');
    break;
    case 'win':
    resultBanner.style.backgroundColor = '#058224';
    // resultBanner.classList.add('win-bkgd');
    console.log('made background green');
    break;
    case 'loss':
    resultBanner.style.backgroundColor = '#820505';
    // resultBanner.classList.add('loss-bkgd');
    console.log('made background red');
    break;
  }
}

// Compare selections and determine winner
function playRound (playerSelection, computerSelection) {

  // Handle tied 
  if (playerSelection === computerSelection) {
    roundResultTransition('tie');
    return 'Tie'
  } else {
    let results = playerSelection + computerSelection;

    // Evaluate results as a string
    switch (results) {

      // All wins
      case 'scissorspaper':
        humanScore++;
        roundResultTransition('win');
        return `You Win! Scissors beat paper.`
      case 'paperrock':
      case 'rockscissors':
        cappedSelection = playerSelection.slice(0, 1).toUpperCase() + 
            playerSelection.slice(1);
        humanScore++;
        roundResultTransition('win');
        return `You Win! ${cappedSelection} beats ${computerSelection}.`
        
      // All losses
      case 'paperscissors':
        computerScore++;
        roundResultTransition('loss');
        return `You Lose! Scissors beat paper.`
      case 'scissorsrock':
      case 'rockpaper':
        cappedSelection = computerSelection.slice(0, 1).toUpperCase() + 
            computerSelection.slice(1);
        computerScore++;
        roundResultTransition('loss');
        return `You Lose! ${cappedSelection} beats ${playerSelection}.`
      default:
        return `Error: Invalid input.`  // Invalid input
    }
  }
}

// Take input
let maxScore;
const containerWarningText = document.querySelector('.container-warningText');
const warningText = document.createElement('div');

// Listen for input
let playingToForm = document.querySelector(".roundInputForm");
window.onload = () => {
  playingToForm.addEventListener('input', () => {
    if (gameEnded) {
      resetGame();
      return;
    }
    maxScore = playingToForm.value;
    // Check invalid input
    if (!(Number(maxScore) > 0 && Number(maxScore) < 101)) {
      if (playingToForm.value.length == 0) return;
      warningText.textContent = 'Invalid value!';
      warningText.style.cssText = 'color: red; font-weight: bold;';
      // Display warning text
      containerWarningText.appendChild(warningText);
    } else {
      try {
        containerWarningText.removeChild(warningText); 
      } catch (e) {}
      // console.log(Number(maxScore));
    }
  })
}

// Initialize score numbers and game status
let computerScore = 0;
let humanScore = 0;
let gameEnded = false;

// Execute game
function game() {
  if (playingToForm.value.length == 0) return;
  let playerSelection;
  switch (this.className) {
    case 'rock choice':
      playerSelection = 'rock';
      break;
    case 'paper choice':
      playerSelection = 'paper';
      break;
    case 'scissors choice':
      playerSelection = 'scissors';
      break;
  }
  let computerSelection = computerPlay();

  // Execute game if not ended
  if (!gameEnded) {
    resultText.textContent = playRound(playerSelection, computerSelection);
    // Update scores
    scores.forEach(score => {
      // console.log(score.className);
      switch (score.className) {
        case 'human score':
          score.textContent = humanScore;
          // console.log(`Human score updated to ${humanScore}.`)
          break;
        case 'computer score':
          score.textContent = computerScore;
          // console.log(`Computer score updated to ${computerScore}.`)
          break;
      }
    })
  }
  // Check for end-game
  if (humanScore >= maxScore || computerScore >= maxScore) {
    if (humanScore > computerScore) {
      resultBanner.style.backgroundColor = '#058224';
      resultText.textContent = 'You Win!';
    } else if (computerScore > humanScore) {
      resultBanner.style.backgroundColor = '#820505';
      resultText.textContent = 'You Lost! Good luck next time.';
    } else {
      resultBanner.style.backgroundColor = '#333333';
      resultText.textContent = 'Tie!';
    }
    gameEnded = true;
    // Show reset button and allow for reset
    resetButton.style.display = "block";
  }
}

// Functionality of reset button
const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {
  resetGame();
})

const buttons = document.querySelectorAll('.choice');
buttons.forEach(button => {
  button.addEventListener('click', game);
})

// Listen for end of result banner transitions
const resultBanner = document.querySelector(".resultBanner");
resultBanner.addEventListener('transitionend', removeTransition);

// How to remove transition based on transition event class name?
// How to make it fade-out, not fade-in?