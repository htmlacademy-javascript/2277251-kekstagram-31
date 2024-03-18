const renderThumbnails = (images) => { // Функция, отвечающая за отображение фотографий других пользователей
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailContainer = document.querySelector('.pictures');
  const thumbnailFragment = document.createDocumentFragment();
  images.forEach((image) => { // Перебираем изображения
    const thumbnail = thumbnailTemplate.cloneNode(true); // Клонируем шаблон и наполняем его
    const thumbnailImage = thumbnail.querySelector('.picture__img');
    thumbnailImage.src = image.url;
    thumbnailImage.alt = image.description;
    thumbnail.querySelector('.picture__likes').textContent = image.likes;
    thumbnail.querySelector('.picture__comments').textContent = image.comments.length;
    thumbnailFragment.append(thumbnail); // Добавляем миниатюру к фрагменту
  });
  thumbnailContainer.append(thumbnailFragment); // Добавляем фрагмент в контейнер
};

export {renderThumbnails};
