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
        return `You Win! Scissors beat paper.`
      case 'paperrock':
      case 'rockscissors':
        cappedSelection = playerSelection.slice(0, 1).toUpperCase() + playerSelection.slice(1);
        return `You Win! ${cappedSelection} beats ${computerSelection}.`
        
      // All losses
      case 'paperscissors':
        return `You Lose! Scissors beat paper.`
      case 'scissorsrock':
      case 'rockpaper':
        cappedSelection = computerSelection.slice(0, 1).toUpperCase() + computerSelection.slice(1);
        return `You Lose! ${cappedSelection} beats ${playerSelection}.`
      default:
        return `Error: Invalid input.`  // Invalid input
    }
  }
}

// Game execution
function game () {
  for (let i = 0; i < 5; i++) {
    let playerSelection = window.prompt("Rock, Paper or Scissors?").toLowerCase();
    let computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
  }
}

game();  // Execute the game