import {onEscapeEvent, isEscapeKey} from './util.js';

const MAX_COMMENTS_COUNT = 5;
const bigImageEl = document.querySelector('.big-picture');
const commentShownCountEl = document.querySelector('.social__comment-shown-count');
const commentTotalCountEl = document.querySelector('.social__comment-total-count');
const commentsListEl = bigImageEl.querySelector('.social__comments');
const commentItemEl = bigImageEl.querySelector('.social__comment');
const commentLoaderEl = document.querySelector('.comments-loader');
const commentInputEl = document.querySelector('.social__footer-text');
const closeButtonEl = document.querySelector('.big-picture__cancel');
let allComments = [];
let currentCount = 0;
const addCommentsHandler = () => { // Функция добавления комментариев в список
  const visibleComments = allComments.slice(currentCount, currentCount + MAX_COMMENTS_COUNT); // Получаем текущие комментарии
  const visibleCommentsLength = visibleComments.length + currentCount; // Считаем общее количество комментариев, показанных на данный момент
  visibleComments.forEach(({avatar, name, message}) => {
    const commentElement = commentItemEl.cloneNode(true);
    const imageEl = commentElement.querySelector('.social__picture');
    imageEl.src = avatar;
    imageEl.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsListEl.append(commentElement);
  });
  commentShownCountEl.textContent = `${visibleCommentsLength}`; // Обновляем количество показанных комментариев и общее количество
  commentTotalCountEl.textContent = `${allComments.length}`;
  if (allComments.length <= visibleCommentsLength) { // Скрываем кнопку, если отображаются все комментарии
    commentLoaderEl.classList.add('hidden');
  }
  currentCount += MAX_COMMENTS_COUNT;
};
const clearComments = () => { // Очищаем существующие комментарии
  while (commentsListEl.firstChild) {
    commentsListEl.removeChild(commentsListEl.firstChild);
  }
  currentCount = 0;
};
const loadAndDisplayComments = (initialComments) => { // Загрузка и отображение начальных комментариев
  allComments = initialComments; // Устанавливаем общее количество комментариев из переданных данных
  addCommentsHandler(); // Загружаем первую партию комментариев
  commentLoaderEl.addEventListener('click', addCommentsHandler); // Добавляем обработчик для загрузки дополнительных комментариев
};
const displayPopupImage = ({url, description, likes, comments}) => { // Функция для отображения деталей фотографии в попапе
  const popupImageEl = bigImageEl.querySelector('.big-picture__img img');
  popupImageEl.src = url;
  popupImageEl.alt = description;
  bigImageEl.querySelector('.social__caption').textContent = description;
  bigImageEl.querySelector('.likes-count').textContent = likes;
  loadAndDisplayComments(comments);
  document.body.classList.add('modal-open');
};
const openPopup = (photo) => { // Функция открытия попапа
  clearComments();
  displayPopupImage(photo);
  bigImageEl.classList.remove('hidden');
  commentInputEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  document.addEventListener('keydown', onEscapeEvent);
};
const closePopup = () => { // Функция закрытия попапа (function declaration для hoisting)
  bigImageEl.classList.add('hidden');
  commentLoaderEl.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onEscapeEvent);
};
closeButtonEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

export {openPopup, closePopup};
