import {onEscapeEvent, isEscapeKey} from './util.js';

const MAX_COMMENTS_COUNT = 5;
const bigImage = document.querySelector('.big-picture');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const commentsList = bigImage.querySelector('.social__comments');
const commentItem = bigImage.querySelector('.social__comment');
const commentLoader = document.querySelector('.comments-loader');
const commentInput = document.querySelector('.social__footer-text');
const closeButton = document.querySelector('.big-picture__cancel');
let allComments = [];
let currentCount = 0;
const addCommentsHandler = () => { // Функция добавления комментариев в список
  const visibleComments = allComments.slice(currentCount, currentCount + MAX_COMMENTS_COUNT); // Получаем текущие комментарии
  const visibleCommentsLength = visibleComments.length + currentCount; // Считаем общее количество комментариев, показанных на данный момент
  visibleComments.forEach(({avatar, name, message}) => {
    const commentElement = commentItem.cloneNode(true);
    const image = commentElement.querySelector('.social__picture');
    image.src = avatar;
    image.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsList.append(commentElement);
  });
  commentShownCount.textContent = `${visibleCommentsLength}`; // Обновляем количество показанных комментариев и общее количество
  commentTotalCount.textContent = `${allComments.length}`;
  if (allComments.length <= visibleCommentsLength) { // Скрываем кнопку, если отображаются все комментарии
    commentLoader.classList.add('hidden');
  }
  currentCount += MAX_COMMENTS_COUNT;
};
const clearComments = () => { // Очищаем существующие комментарии
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  currentCount = 0;
};
const loadAndDisplayComments = (initialComments) => { // Загрузка и отображение начальных комментариев
  allComments = initialComments; // Устанавливаем общее количество комментариев из переданных данных
  addCommentsHandler(); // Загружаем первую партию комментариев
  commentLoader.addEventListener('click', addCommentsHandler); // Добавляем обработчик для загрузки дополнительных комментариев
};
const displayPopupImage = ({url, description, likes, comments}) => { // Функция для отображения деталей фотографии в попапе
  const popupImage = bigImage.querySelector('.big-picture__img img');
  popupImage.src = url;
  popupImage.alt = description;
  bigImage.querySelector('.social__caption').textContent = description;
  bigImage.querySelector('.likes-count').textContent = likes;
  loadAndDisplayComments(comments);
  document.body.classList.add('modal-open');
};
const openPopup = (photo) => { // Функция открытия попапа
  clearComments();
  displayPopupImage(photo);
  bigImage.classList.remove('hidden');
  commentInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  document.addEventListener('keydown', onEscapeEvent);
};
const closePopup = () => { // Функция закрытия попапа (function declaration для hoisting)
  bigImage.classList.add('hidden');
  commentLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onEscapeEvent);
}
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

export {openPopup, closePopup};
