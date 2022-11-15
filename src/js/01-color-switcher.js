const SWITCH_TIME = 1000;

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let colorSwitchInterval = null;

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  refs.btnStart.setAttribute('disabled', '');
  colorSwitchInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick() {
  refs.btnStart.removeAttribute('disabled');
  clearInterval(colorSwitchInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
