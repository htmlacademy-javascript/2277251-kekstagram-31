import {isEscapeKey} from './util.js';
import {resetScale} from './image-scale';
import {updateScale} from './image-scale.js';
import {setupEffects} from './image-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
const submitForm = (evt) => { // Функция для отправки формы
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
    hideUploadForm();
  }
};
const onEscapeEvent = (evt) => { // Функция для закрытия формы, на нажатие Escape
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadForm();
  }
};
const displayUploadForm = () => { // Функция для отображения формы загрузки
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetScale();
  updateScale(1);
  setupEffects();
  document.addEventListener('keydown', onEscapeEvent);
};
const validateHashtag = (hashtag) => { // Функция настроек валидации хэштега
  const regex = /^#[a-zа-яё0-9]{1,19}$/i;
  return regex.test(hashtag);
};
const areHashtagsUnique = (hashtags) => { // Функция для проверки уникальности хэштегов
  const lowerHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const seenHashtag = new Set();
  for (let i = 0; i < lowerHashtags.length; i++) {
    const currentHashtag = lowerHashtags[i];
    if (seenHashtag.has(currentHashtag)) {
      return false;
    }
    seenHashtag.add(currentHashtag);
  }
  return true;
};
const areHashtagsValid = (hashtagsString) => { // Функция для проверки хэштегов на валидность
  const maxHashtags = 5;
  const trimmed = hashtagsString.trim();
  if (!trimmed) {
    return true;
  }
  const hashtags = trimmed.split(' ');
  const validHashtags = hashtags.every((hashtag) => validateHashtag(hashtag));
  return validHashtags && hashtags.length <= maxHashtags && areHashtagsUnique(hashtags);
};
const maxCommentLength = 140;
const validateComment = (comment) => comment.length <= maxCommentLength; // Функция настроек валидации комментария
function hideUploadForm() { // Функция скрытия формы загрузки
  pristine.reset();
  uploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeEvent);
}
const configureFormValidation = () => { // Функция конфигурации проверки формы
  uploadForm.addEventListener('submit', submitForm);
  closeButton.addEventListener('click', hideUploadForm);
  descriptionInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  fileInput.addEventListener('change', displayUploadForm);
  pristine.addValidator(hashtagInput, areHashtagsValid, 'Хэштег невалиден.');
  pristine.addValidator(descriptionInput, validateComment, 'Длина комментария не может составлять больше 140 символов.');
};

export {configureFormValidation};
