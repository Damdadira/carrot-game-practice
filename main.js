'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5; //5초

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

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

function stopGame() {
  stopGameTimer();
  hideGameButton();
  showPopupWithText('REPLAY');
}

function showStopButton() {
  //gameBtn 세모냐 네모냐
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC; //5초동안 유지하겠다
  updateTimerText(remainingTimeSec); //시작하기 전에 업데이트 하는 용도(5초부터 시작해 하나하나 줄여가겠다)
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      //0초와 같거나 작다면 타이머 중지
      clearInterval(timer);
      return;
    }
    //0초가 아니라 게임이 계속 돌아가고 있다면
    updateTimerText(--remainingTimeSec); //하나하나씩 줄이겠다
  }, 1000); //1초
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60); //floor->소수를 정수로 만들어줌
  const secondes = time % 60;
  gameTimer.innerHTML = `${minutes}:${secondes}`;
}

function showPopupWithText(text) {
  popUpText.innerHTML = text;
  popUp.classList.remove('pop-up--hide'); //css에서 hide해놔서 클래스를 제거해야 보임
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
