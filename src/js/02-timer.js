import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTime = document.querySelector('#datetime-picker');
const startBT = document.querySelector('button[data-start]');
startBT.setAttribute('disabled', '');

const fp = flatpickr(dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected(selectedDates);
  },
});

function dateSelected(selectedDates) {
  const remainingTime = selectedDates[0] - Date.now();

  if (remainingTime < 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    startBT.removeAttribute('disabled');
    startCountdown(selectedDates);
  }
}

function startCountdown(selectedDates) {
  const daysOutput = document.querySelector('span[data-days]');
  const hoursOutput = document.querySelector('span[data-hours]');
  const minutesOutput = document.querySelector('span[data-minutes]');
  const secondsOutput = document.querySelector('span[data-seconds]');
  const interval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDates[0] - Date.now()
    );
    if (selectedDates[0] - Date.now() <= 0) {
      clearInterval(interval);
    } else {
      daysOutput.textContent = addLeadingZero(days);
      hoursOutput.textContent = addLeadingZero(hours);
      minutesOutput.textContent = addLeadingZero(minutes);
      secondsOutput.textContent = addLeadingZero(seconds);
    }
  }, 1000);
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
