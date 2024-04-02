import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const showSuccessAlert = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  const successMessage = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');
  document.querySelector('.success__button').addEventListener('click', removeMessageHandler);
  document.addEventListener('keydown', closeEventsHandler);
  document.addEventListener('click', closeEventsHandler);
  function removeMessageHandler () {
    successMessage.remove();
  }
  function closeEventsHandler (evt) {
    if (isEscapeKey(evt)) {
      removeMessageHandler();
    }
  }
  document.addEventListener('click', (evt) => {
    if (evt.target !== successInner && !successInner.contains(evt.target)) {
      removeMessageHandler();
    }
  });
};
const showErrorAlert = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  const errorMessage = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  document.querySelector('.error__button').addEventListener('click', removeMessageHandler);
  document.addEventListener('keydown', closeEventsHandler);
  document.addEventListener('click', closeEventsHandler);
  function removeMessageHandler () {
    errorMessage.remove();
  }
  function closeEventsHandler (evt) {
    if (isEscapeKey(evt)) {
      removeMessageHandler();
    }
  }
  document.addEventListener('click', (evt) => {
    if (evt.target !== errorInner && !errorInner.contains(evt.target)) {
      removeMessageHandler();
    }
  });
};
const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);
  const dataErrorMessage = document.querySelector('.data-error');
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessAlert, showErrorAlert, showDataError};
