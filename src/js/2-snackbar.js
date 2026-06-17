import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelayEl: document.querySelector('input[type="number"]'),
  inputFulfilledEl: document.querySelector('input[value="fulfilled"]'),
  inputRejectedEl: document.querySelector('input[value="rejected"]'),
};

refs.formEl.addEventListener('submit', onFormSubmitClick);

function onFormSubmitClick(event) {
  event.preventDefault();
  let state = '';
  const delay = +refs.inputDelayEl.value;

  refs.inputFulfilledEl.checked ? (state = 'fulfilled') : (state = 'rejected');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.show({
        backgroundColor: 'green',
        position: 'topRight',
        title: 'OK',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        iconUrl: '../img/fulfilled.svg',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        maxWidth: '380px',
        close: true,
      });
    })
    .catch(delay => {
      iziToast.show({
        backgroundColor: 'red',
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        iconUrl: '../img/icon.svg',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        maxWidth: '380px',
        close: true,
      });
    });
  refs.formEl.reset();
}
