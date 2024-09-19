let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updatScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
} else {
  clearInterval(intervalId);
  isAutoPlaying = false;
  }

}

document.querySelector('.js-rock-button').    
  addEventListener('click', () => {
    playGame('Rock');
  })

document.querySelector('.js-paper-button').    
  addEventListener('click', () => {
    playGame('Paper');
})

document.querySelector('.js-scissor-button').    
  addEventListener('click', () => {
    playGame('Scissor');
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  }
  else if (event.key === 'p') {
    playGame('Paper');
  }
  else if (event.key === 's') {
    playGame('Scissor');
  }
});

function playGame(playerMove) {
const computerPick = pickComputerMove();
let result = ''
if (playerMove === 'Scissor') {
  if (computerPick === 'Rock') {
  result = 'Loss';
  }
  else if (computerPick === 'Paper') {
    result = 'Win';
  }
  else if (computerPick ===  'Scissor') {
    result = 'Tie';
  }
} 

else if (playerMove === 'Paper') {
  if (computerPick === 'Rock') {
    result = 'Win';
    }
  else if (computerPick === 'Paper') {
    result = 'Tie';
  }
  else if (computerPick ===  'Scissor') {
    result = 'Loss';
  }
}

else if (playerMove === 'Rock') {
  if (computerPick === 'Rock') {
    result = 'Tie';
  }
  else if (computerPick === 'Paper') {
    result = 'Loss';
  }
  else if (computerPick ===  'Scissor') {
    result = 'Win';
  }
}

if (result === 'Win') {
  // score.wins = score.wins + 1
  score.wins += 1
}
else if (result === 'Loss') {
  score.losses += 1
}
else if (result === 'Tie') {
  score.ties += 1
}

localStorage.setItem('score', JSON.stringify(score));

updatScoreElement();

document.querySelector('.js-result')
  .innerHTML = result;

document.querySelector('.js-moves')
  .innerHTML = `You
<img src="move/${playerMove}.png" class="move-icon">
<img src="move/${computerPick}.png" class="move-icon">
Computer`;
}

function updatScoreElement() {
document.querySelector(".js-score")
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
let computerPick = ''
let randomN = Math.random();
  if (randomN >= 0 && randomN < 1/3) {
    computerPick = 'Rock';
  } 
  else if (randomN >= 1/3 && computerPick < 2/3) {
    computerPick = 'Paper';
  } 
  else if (randomN >= 2/3 && randomN < 1) {
    computerPick = 'Scissor';
  }
  return computerPick;
}
