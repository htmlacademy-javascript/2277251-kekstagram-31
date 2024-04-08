import {openPopup} from './popup.js';

const thumbnailTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainerEl = document.querySelector('.pictures');
const removeThumbnailElements = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};
const renderThumbnails = (images) => { // Функция, отвечающая за отображение фотографий других пользователей
  removeThumbnailElements();
  const thumbnailFragment = document.createDocumentFragment();
  images.forEach(({url, description, likes, comments}) => { // Перебираем изображения
    const thumbnail = thumbnailTemplateEl.cloneNode(true); // Клонируем шаблон и наполняем его
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup({url, description, likes, comments});
    });
    const thumbnailImageEl = thumbnail.querySelector('.picture__img');
    thumbnailImageEl.src = url;
    thumbnailImageEl.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailFragment.append(thumbnail); // Добавляем миниатюру к фрагменту
  });
  thumbnailContainerEl.append(thumbnailFragment); // Добавляем фрагмент в контейнер
};

export {renderThumbnails};
