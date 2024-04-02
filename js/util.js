import {closePopup, commentsList} from './popup.js';

const DEBOUNCE_DELAY = 500;
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
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => { // Функция для устранения дребезга
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, isEscapeKey, onEscapeEvent, clearComments, debounce, DEBOUNCE_DELAY};
