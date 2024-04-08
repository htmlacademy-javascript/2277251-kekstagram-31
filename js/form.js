import {isEscapeKey} from './util.js';
import {DEFAULT_SCALE, updateScale, resetScale} from './image-scale.js';
import {setupEffects} from './image-effects.js';
import {sendData} from './api.js';
import {showSuccessAlert, showErrorAlert} from './alerts.js';
import {handleFileChange} from './chosen-image.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
const uploadFormEl = document.querySelector('.img-upload__form');
const fileInputEl = document.querySelector('.img-upload__input');
const overlayEl = document.querySelector('.img-upload__overlay');
const closeButtonEl = document.querySelector('.img-upload__cancel');
const hashtagInputEl = document.querySelector('.text__hashtags');
const descriptionInputEl = document.querySelector('.text__description');
const submitButtonEl = document.querySelector('.img-upload__submit');
const pristine = new Pristine(uploadFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
const blockSubmitButton = () => {
  submitButtonEl.disabled = true;
  submitButtonEl.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = () => {
  submitButtonEl.disabled = false;
  submitButtonEl.textContent = SubmitButtonText.IDLE;
};
const onSubmitForm = (evt) => { // Функция для отправки формы
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        hideUploadFormHandler();
        showSuccessAlert();
      })
      .catch((err) => {
        showErrorAlert(err.message);
      })
      .finally(unblockSubmitButton);
  }
};
const onEscapeEvent = (evt) => { // Функция для закрытия формы, на нажатие Escape
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadFormHandler();
  }
};
const showUploadFormHandler = () => { // Функция для отображения формы загрузки
  overlayEl.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const file = fileInputEl.files[0];
  handleFileChange(file);
  resetScale();
  updateScale(DEFAULT_SCALE);
  setupEffects();
  document.addEventListener('keydown', onEscapeEvent);
};
const normalizeHashtags = (hashtags) => hashtags.trim().toLowerCase().split(' ');
const setupHashtagRegex = (hashtags) => { // Проверка на соответствие шаблону регулярного выражения для хэштега
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  const normalizedHashtags = normalizeHashtags(hashtags);
  if (!hashtags) {
    return true;
  }
  return normalizedHashtags.every((hashtag) => regex.test(hashtag));
};
const checkHashtagsCount = (hashtags) => { // Проверяем, что количество хэштегов меньше или равно максимальному
  const normalizedHashtags = normalizeHashtags(hashtags);
  return normalizedHashtags.length <= MAX_HASHTAGS;
};
const checkDuplicateHashtags = (hashtags) => { // Проверка дубликатов хэштегов путем фильтрации уникальных элементов
  const normalizedHashtags = normalizeHashtags(hashtags);
  if (normalizedHashtags.length) {
    const uniqueHashtags = normalizedHashtags.filter((element, index) => {
      if (normalizedHashtags.indexOf(element) !== index) {
        return element;
      }
    });
    return uniqueHashtags.length === 0;
  }
};
const validateComment = (comment) => comment.length <= MAX_COMMENT_LENGTH; // Функция настроек валидации комментария
function hideUploadFormHandler() { // Функция скрытия формы загрузки
  pristine.reset();
  uploadFormEl.reset();
  overlayEl.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeEvent);
}
const formValidations = [
  [hashtagInputEl, setupHashtagRegex, 'Введён невалидный хэштег'],
  [hashtagInputEl, checkHashtagsCount, 'Не более 5 хештегов'],
  [hashtagInputEl, checkDuplicateHashtags , 'Хештеги не должны повторяться'],
  [descriptionInputEl, validateComment, 'Длина комментария больше 140 символов'],
];
const configureFormValidation = () => { // Функция конфигурации проверки формы
  uploadFormEl.addEventListener('submit', onSubmitForm);
  closeButtonEl.addEventListener('click', hideUploadFormHandler);
  descriptionInputEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  hashtagInputEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  fileInputEl.addEventListener('change', showUploadFormHandler);
  formValidations.forEach(([element, validation, errorText]) => pristine.addValidator(element, validation, errorText));
};

export {configureFormValidation};
