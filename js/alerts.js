import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const showSuccessAlert = () => {
  const successTemplateEl = document.querySelector('#success').content;
  const successElement = successTemplateEl.cloneNode(true);
  document.body.append(successElement);
  const successMessageEl = document.querySelector('.success');
  const successInnerEl = document.querySelector('.success__inner');
  document.querySelector('.success__button').addEventListener('click', removeMessageHandler);
  document.body.addEventListener('keydown', closeEventsHandler);
  document.body.addEventListener('click', closeEventsHandler);
  function removeMessageHandler () {
    successMessageEl.remove();
    document.body.removeEventListener('keydown', closeEventsHandler);
  }
  function closeEventsHandler (evt) {
    if (isEscapeKey(evt)) {
      removeMessageHandler();
    }
  }
  document.body.addEventListener('click', (evt) => {
    if (evt.target !== successInnerEl && !successInnerEl.contains(evt.target)) {
      removeMessageHandler();
    }
  });
};
const showErrorAlert = () => {
  const errorTemplateEl = document.querySelector('#error').content;
  const errorElement = errorTemplateEl.cloneNode(true);
  document.body.append(errorElement);
  const errorMessage = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  document.querySelector('.error__button').addEventListener('click', removeMessageHandler);
  document.body.addEventListener('keydown', closeEventsHandler);
  document.body.addEventListener('click', closeEventsHandler);
  function removeMessageHandler () {
    errorMessage.remove();
    document.body.removeEventListener('keydown', closeEventsHandler);
  }
  function closeEventsHandler (evt) {
    evt.stopPropagation();
    if (isEscapeKey(evt)) {
      removeMessageHandler();
    }
  }
  document.body.addEventListener('click', (evt) => {
    if (evt.target !== errorInner && !errorInner.contains(evt.target)) {
      removeMessageHandler();
    }
  });
};
const showDataError = () => {
  const dataErrorTemplateEl = document.querySelector('#data-error').content;
  const dataErrorElement = dataErrorTemplateEl.cloneNode(true);
  document.body.append(dataErrorElement);
  const dataErrorMessage = document.querySelector('.data-error');
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessAlert, showErrorAlert, showDataError};
