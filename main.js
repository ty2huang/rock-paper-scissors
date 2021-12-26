let winsAgainst = {'rock': 'scissors', 'scissors': 'paper', 'paper': 'rock'};

function computerPlay() {
    let rand = Math.floor(Math.random()*3);
    if (rand === 0) {
        return 'Rock';
    } else if (rand === 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 0;
    } else if (computerSelection === winsAgainst[playerSelection] || playerSelection === 'dynamite') {
        return 1;
    } else {
        return -1;
    }
}

function game() {
    let playerGamesWon = 0;
    let computerGamesWon = 0;
    const roundsToWin = 5;
    const state = () => `\nYou: ${playerGamesWon}\nComputer: ${computerGamesWon}`
    while (playerGamesWon < roundsToWin && computerGamesWon < roundsToWin) {
        let playerSelection = prompt('Rock, Paper, or Scissors?');
        let computerSelection = computerPlay();
        let winner = playRound(playerSelection.toLowerCase(), computerSelection.toLowerCase());
        let message;
        if (winner === 1) {
            playerGamesWon++;
            message = `You Win! ${playerSelection} beats ${computerSelection}`;
        } else if (winner === -1) {
            computerGamesWon++;
            message = `You Lose! ${computerSelection} beats ${playerSelection}`;
        } else {
            message = `Tie! Both you and computer played ${playerSelection}`;
        }
        alert(message + state());
    }

    if (playerGamesWon > computerGamesWon) {
        alert("Congratulations! You won 5 rounds before the computer!")
    } else {
        alert("That's too bad... the computer won 5 rounds before you.")
    }
}

let playAgain = true;
while (playAgain) {
    game();
    playAgain = confirm("Would you like to play again?");
}
