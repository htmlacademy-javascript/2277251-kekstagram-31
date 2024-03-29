import {closePopup, commentsList} from './popup.js';

const ALERT_SHOW_TIME = 5000;
const getRandomInteger = (a, b) => { // Функция для генерации случайного числа от min до max
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const isEscapeKey = (evt) => evt.key === 'Escape'; // Функция для проверки, нажата ли клавиша Escape
const onEscapeEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};
const clearComments = () => {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
};

const showAlert = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  const errorMessage = document.querySelector('.data-error');
  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, isEscapeKey, onEscapeEvent, clearComments, showAlert};
