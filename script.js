const START_KEY = 'Space';

const levelTitleEl = document.querySelector('.level-title');

const buttons = document.querySelectorAll('.btn');
const buttonsContainer = document.querySelector('.container');

const countUserMovesEl = document.querySelector('.user-count-move');
const countMovesEl = document.querySelector('.count-moves');
const progressEl = document.querySelector('.progress-block');

let gameIsStarted = false;
let currentLevel = 0;
let isPlayerOrder = false;

let gameQueue = [];
let userQueue = [];

document.addEventListener('keydown', (e) => {
  if(e.code === START_KEY && !gameIsStarted) start();
})
buttonsContainer.addEventListener('click', function(e) {
  if(!isPlayerOrder) return;

  const btn = e.target;
  if(!btn.classList.contains('btn')) return;

  checkUserChoice(btn);
})

function reset() {
  levelTitleEl.textContent = 'Press SPACE to Start';

  countMovesEl.textContent = '0';
  countUserMovesEl.textContent = '0';
  progressEl.style.display = 'none';

  currentLevel = 0;
  gameQueue = [];
  userQueue = [];
  gameIsStarted = false;
}

function start() {
  progressEl.style.display = 'block';
  gameIsStarted = true;
  levelTitleEl.textContent = 'START!!!'
  setTimeout(() => {
    nextLevel();
  }, 500)
}

function nextLevel() {
   isPlayerOrder = false;

   userQueue = [];
   levelTitleEl.textContent = 'Level '+ ++currentLevel;

   countMovesEl.textContent = currentLevel;
   countUserMovesEl.textContent = String(userQueue.length);

   const randBtn = buttons[Math.floor(Math.random() * buttons.length)];
   gameQueue.push(randBtn);

   playButton(randBtn);
   isPlayerOrder = true;
}

function loose() {
  isPlayerOrder = false

  document.body.classList.add('game-over');
  levelTitleEl.textContent = 'Loose!!!';

  setTimeout(() => {
    levelTitleEl.textContent = 'Press key to Start';
    document.body.classList.remove('game-over');

    reset();
  }, 1000);
}

function playButton(btn) {
  const audio = new Audio(btn.dataset.sound);
  audio.play().then(() => {
    if(!isPlayerOrder) isPlayerOrder = true;
    btn.classList.add('pressed');
    setTimeout(() => {
      btn.classList.remove('pressed');
    }, 100)
  });
}

function checkUserChoice(btn) {
  userQueue.push(btn);
  const currentMoveNum = userQueue.length - 1;

  if(userQueue[currentMoveNum] === gameQueue[currentMoveNum]) {
    playButton(btn);
    countUserMovesEl.textContent = String(userQueue.length);

    if(userQueue.length === gameQueue.length) {
      setTimeout(() => {
        nextLevel();
      }, 500)
    }
  } else {
    loose();
  }
}

reset()