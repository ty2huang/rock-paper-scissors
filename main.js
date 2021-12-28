let playerGamesWon = 0;
let computerGamesWon = 0;
const roundsToWin = 5;

const rock = 'Pansage';
const paper = 'Pansear';
const scissors = 'Panpour';

let winsAgainst = new Map();
winsAgainst.set(rock, scissors);
winsAgainst.set(scissors, paper);
winsAgainst.set(paper, rock);

const rockBtn = document.querySelector('#leaf');
const paperBtn = document.querySelector('#fire');
const scissorsBtn = document.querySelector('#water');

const yourImg = document.querySelector('#your-play');
const computerImg = document.querySelector('#computer-play');

const yourScoreSpan = document.querySelector('#your-score');
const computerScoreSpan = document.querySelector('#opponent-score')

const messageDiv = document.querySelector('#message');
const finalResultDiv = document.querySelector('#final-result')
const playAgainDiv = document.querySelector('#play-again');
const playAgainBtn = document.querySelector('#play-again-btn');

function resetGame() {
    playerGamesWon = 0;
    computerGamesWon = 0;
    messageDiv.innerHTML = '';
    yourImg.src = `img/question.png`;
    computerImg.src = `img/question.png`;
    yourScoreSpan.textContent = playerGamesWon;
    computerScoreSpan.textContent = computerGamesWon;
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
    playAgainDiv.style.display = "none";
}

function computerPlay() {
    let rand = Math.floor(Math.random()*3);
    if (rand === 0) {
        return rock;
    } else if (rand === 1) {
        return paper;
    } else {
        return scissors;
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 0;
    } else if (computerSelection === winsAgainst.get(playerSelection)) {
        return 1;
    } else {
        return -1;
    }
}

function promptPlayAgain() {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
    playAgainDiv.style.display = "block";
}

function handleClick(playerSelection) {
    let computerSelection = computerPlay();
    let winner = playRound(playerSelection, computerSelection);
    let message;
    if (winner === 1) {
        playerGamesWon++;
        message = `${playerSelection} is super effective against ${computerSelection}!<br>You win this round!`;
    } else if (winner === -1) {
        computerGamesWon++;
        message = `${playerSelection} is not very effective against ${computerSelection}.<br>The opponent wins this round.`;
    } else {
        message = `Both players played ${playerSelection}. Their attacks have no effect on each other.<br>Neither player wins.`;
    }

    messageDiv.innerHTML = message;
    yourImg.src = `img/${playerSelection}.png`;
    computerImg.src = `img/${computerSelection}.png`;
    yourScoreSpan.textContent = playerGamesWon;
    computerScoreSpan.textContent = computerGamesWon;

    if (playerGamesWon === roundsToWin) {
        finalResultDiv.textContent = "Yay! You Won!"
    } else if (computerGamesWon === roundsToWin) {
        finalResultDiv.textContent = "Oh no. You Lost."
    } else {
        return;
    }
    promptPlayAgain();
}

rockBtn.addEventListener('click', () => handleClick(rock));
paperBtn.addEventListener('click', () => handleClick(paper));
scissorsBtn.addEventListener('click', () => handleClick(scissors));
playAgainBtn.addEventListener('click', resetGame);
