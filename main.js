'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  // console.log('log');
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame(); //초기화
  showStopButton(); //게임 시작 버튼 아이콘 변경
  showTimerAndScore(); //timer와 score 평소에는 안보이다가 시작하면 보이게
  startGameTimer(); //시작버튼을 누르면 타이머가 작동하도록
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function stopGame() {}

function showStopButton() {
  //gameBtn 세모냐 네모냐
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function initGame() {
  field.innerHTML = ''; //reset될때마다 이미지의 숫자가 늘어나지 않도록 초기화
  gameScore.innerHTML = CARROT_COUNT; //gameScore의 값은 당근만큼
  //벌레와 당근을 생성한뒤 field에 추가해줌
  // console.log(fieldRect); ->값 확인용
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE; //CARROT_SIZE만큼 빼주지 않으면 범위를 넘어감
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
