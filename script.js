// Calculate computer choice
function computerPlay () {
  let ranNum = Math.floor(Math.random() * 3);
  return (ranNum === 0) ? 'rock' : (ranNum === 1) ? 'paper' : 'scissors';
}

// Compare selections and determine winner
function playRound (playerSelection, computerSelection) {

  // Handle tied 
  if (playerSelection === computerSelection) {
    return 'Tie'
  } else {
    let results = playerSelection + computerSelection;

    // Evaluate results as a string
    switch (results) {

      // All wins
      case 'scissorspaper':
        humanScore++;
        return `You Win! Scissors beat paper.`
      case 'paperrock':
      case 'rockscissors':
        cappedSelection = playerSelection.slice(0, 1).toUpperCase() + 
            playerSelection.slice(1);
        humanScore++;
        return `You Win! ${cappedSelection} beats ${computerSelection}.`
        
      // All losses
      case 'paperscissors':
        computerScore++;
        return `You Lose! Scissors beat paper.`
      case 'scissorsrock':
      case 'rockpaper':
        cappedSelection = computerSelection.slice(0, 1).toUpperCase() + 
            computerSelection.slice(1);
        computerScore++;
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

// Element selection
const resultText = document.querySelector('.results');
const scoreText = document.querySelector('.scoreboard');
const finalResultText = document.querySelector('.finalResult');
const scores = document.querySelectorAll('.score');

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
      console.log(score.className);
      switch (score.className) {
        case 'human score':
          score.textContent = humanScore;
          console.log(`Human score updated to ${humanScore}.`)
          break;
        case 'computer score':
          score.textContent = computerScore;
          console.log(`Computer score updated to ${computerScore}.`)
          break;
      }
    })
  }
  // Check for end-game
  if (humanScore >= maxScore || computerScore >= maxScore) {
    if (humanScore > computerScore) {
      finalResultText.textContent = 'You Win!';
    } else if (computerScore > humanScore) {
      finalResultText.textContent = 'You Lost! Good luck next time.';
    } else {
      finalResultText.textContent = 'Tie!';
    }
    gameEnded = true;
    // Show reset button and allow for reset
    resetButton.style.display = "block";
  }
}

// Reset everything
const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', () => {
  if (gameEnded) {
    console.log('lol');
    computerScore = 0;
    humanScore = 0;
    gameEnded = false;
    scores.forEach(score => {
      score.textContent = 0;
    })
    finalResultText.textContent = '';
  }
})

const buttons = document.querySelectorAll('.choice');
buttons.forEach(button => {
  button.addEventListener('click', game);
})

// Game execution  --  Play five rounds
// function game () {
//   for (let i = 0; i < 5; i++) {
//     let playerSelection = 
//         window.prompt("Rock, Paper or Scissors?").toLowerCase();
//     let computerSelection = computerPlay();
//     console.log(playRound(playerSelection, computerSelection));
//   }
// }

// game();  // Execute the game