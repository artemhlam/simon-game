const START_KEY = 'Space';
const COUNT_BTNS = 4;

const levelTitleEl = document.querySelector('.level-title');

const btns = document.querySelectorAll('.btn');
const btnsContainer = document.querySelector('.container');

const countUserMovesEl = document.querySelector('.user-count-move');
const countMovesEl = document.querySelector('.count-moves');

let gameIsStarted = false;
let currentLevel = 0;
let isPlayerOrder = false;

let gameQueue = [];
let userQueue = [];

function reset() {
  levelTitleEl.textContent = 'Press SPACE to Start';
  countMovesEl.textContent = 0;
  countUserMovesEl.textContent = 0;
  currentLevel = 0;
  gameQueue = [];
  userQueue = [];
  gameIsStarted = false;
}

function start() {
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
   countUserMovesEl.textContent = userQueue.length;

   const randBtn = btns[Math.floor(Math.random() * COUNT_BTNS)];
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
  audio.play().then(res => {
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
    countUserMovesEl.textContent = userQueue.length;

    if(userQueue.length === gameQueue.length) {
      setTimeout(() => {
        nextLevel();
      }, 500)
    }
  } else {
    loose();
  }
}

btnsContainer.addEventListener('click', function(e) {
  if(!isPlayerOrder) {
    return;
  }

  const btn = e.target;
  if(!btn.classList.contains('btn')) return;

  checkUserChoice(btn);
})
document.addEventListener('keydown', (e) => {
  if(e.code === START_KEY && !gameIsStarted) start();
})