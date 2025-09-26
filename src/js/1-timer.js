import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0], userSelectedDate);
    checkDate();
  },
};

flatpickr(inputDate, options);

function checkDate() {
  if (userSelectedDate <= new Date()) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
}

iziToast.show({
  title: 'Error',
  message: 'Please choose a date in the future',
});

function startTimer() {
  const intervalId = setInterval(() => {
    const ms = userSelectedDate.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(intervalId);
      inputDate.disabled = false;
      return;
    }
    const time = convertMs(ms);
    updateTimerDisplay(time);
  }, 1000);
}

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;
  inputDate.disabled = true;
  startTimer();
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
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
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
