import {closePopup} from './popup.js';

const DEBOUNCE_DELAY = 500;
const isEscapeKey = (evt) => evt.key === 'Escape'; // Функция для проверки, нажата ли клавиша Escape
const onEscapeEvent = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};
const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => { // Функция для устранения дребезга
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, onEscapeEvent, debounce, DEBOUNCE_DELAY};
