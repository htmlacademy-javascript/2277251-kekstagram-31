import {onEscapeEvent, clearComments} from './util.js';

const bigImage = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentsList = bigImage.querySelector('.social__comments');
const commentItem = bigImage.querySelector('.social__comment');
const commentLoader = document.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
const addComments = (comments) => { // Функция добавления комментариев в список
  clearComments();
  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentItem.cloneNode(true);
    const image = commentElement.querySelector('.social__picture');
    image.src = avatar;
    image.alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentsList.append(commentElement);
  });
};
const displayPopupImage = ({url, description, likes, comments}) => { // Функция для отображения деталей фотографии в попапе
  const popupImage = bigImage.querySelector('.big-picture__img img');
  popupImage.src = url;
  popupImage.alt = description;
  bigImage.querySelector('.social__caption').textContent = description;
  bigImage.querySelector('.likes-count').textContent = likes;
  bigImage.querySelector('.social__comment-total-count').textContent = comments.length;
  addComments(comments);
};
function closePopup () { // Функция закрытия попапа (function declaration для hoisting)
  bigImage.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onEscapeEvent);
}
closeButton.addEventListener('click', (event) => {
  event.preventDefault();
  closePopup();
});
const openPopup = (photo) => { // Функция открытия попапа
  displayPopupImage(photo);
  bigImage.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscapeEvent);
};

export {openPopup, closePopup, commentsList};
