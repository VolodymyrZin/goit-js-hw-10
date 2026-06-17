// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const refs = {
  startButton: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  inputField: document.querySelector('#datetime-picker'),
};
refs.startButton.addEventListener('click', handleStartButtonClick);
refs.startButton.disabled = true;

console.log(refs.startButton);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onDateSelection,
};

flatpickr('input[type="text"]', options);

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

function onDateSelection(selectedDates) {
  const chosenDate = selectedDates[0];
  const currentDate = new Date();
  if (chosenDate < currentDate) {
    refs.startButton.disabled = true;
    userSelectedDate = null;
    return iziToast.show({
      backgroundColor: 'red',
      position: 'topRight',
      title: 'Error',
      titleColor: '#fff',
      titleSize: '16px',
      titleLineHeight: '1.5',
      iconUrl: '../img/icon.svg',
      message: 'Please choose a date in the future',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      imageWidth: '302px',
      close: true,
    });
  } else {
    userSelectedDate = chosenDate;
    refs.startButton.disabled = false;
  }
}

function handleStartButtonClick(event) {
  let difference;
  refs.startButton.disabled = true;
  refs.inputField.disabled = true;
  const intervalId = setInterval(() => {
    difference = userSelectedDate - new Date();

    if (difference <= 0) {
      clearInterval(intervalId);
      refs.inputField.disabled = false;
      refs.dataDays.textContent = '00';
      refs.dataHours.textContent = '00';
      refs.dataMinutes.textContent = '00';
      refs.dataSeconds.textContent = '00';
    } else {
      const timeData = convertMs(difference);
      refs.dataDays.textContent = addLeadingZero(timeData.days);
      refs.dataHours.textContent = addLeadingZero(timeData.hours);
      refs.dataMinutes.textContent = addLeadingZero(timeData.minutes);
      refs.dataSeconds.textContent = addLeadingZero(timeData.seconds);
    }
  }, 1000);
}
