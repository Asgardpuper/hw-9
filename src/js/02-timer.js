import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEL: document.querySelector('[data-days]'),
  hoursEL: document.querySelector('[data-hours]'),
  minutesEL: document.querySelector('[data-minutes]'),
  secondsEL: document.querySelector('[data-seconds]'),
};

let intervalTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeDifference = selectedDates[0] - new Date();
    if (timeDifference <= 0) {
      window.alert('Please choose a date in the future');
      return;
    }
    activateStartBtn();
    refs.startBtn.addEventListener('click', () => {
      intervalTimer = setInterval(() => {
        setTimer(selectedDates[0]);
      }, 1000);
    });
  },
};

const timePicker = flatpickr('#datetime-picker', options);

disableStartBtn();

function setTimer(selectedDates) {
  const { days, hours, minutes, seconds } = convertMs(
    selectedDates - new Date()
  );
  if (selectedDates - new Date() < 1000) {
    clearInterval(intervalTimer);
  }
  refs.daysEL.textContent = addLeadingZero(days);
  refs.hoursEL.textContent = addLeadingZero(hours);
  refs.minutesEL.textContent = addLeadingZero(minutes);
  refs.secondsEL.textContent = addLeadingZero(seconds);
}

function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', '');
}

function activateStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
