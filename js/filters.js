import {debounce, DEBOUNCE_DELAY} from './util.js';
import {renderThumbnails} from './thumbnails.js';

const MAX_RANDOM_PHOTO_COUNT = 10;
const filterDefaultEl = document.querySelector('#filter-default');
const filterRandomEl = document.querySelector('#filter-random');
const filterDiscussedEl = document.querySelector('#filter-discussed');
const setActiveButton = (currentButton) => {
  const activeButtonEl = document.querySelector('.img-filters__button--active');
  if (currentButton !== activeButtonEl) {
    activeButtonEl.classList.remove('img-filters__button--active');
  }
  currentButton.classList.add('img-filters__button--active');
};
const sortByComments = (image1, image2) => image2.comments.length - image1.comments.length; // Сортировка изображений по количеству комментариев
const applyDefaultFilter = (images) => () => { // Фильтр по умолчанию, рендерим все изображения
  renderThumbnails(images);
};
const applyRandomFilter = (images) => () => { // Фильтр рандомных изображений, перетасовываем и копируем нужное количество
  const shuffledImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_PHOTO_COUNT);
  renderThumbnails(shuffledImages);
};
const applyDiscussedFilter = (images) => () => { // Фильтр обсуждаемых изображений, сортируемых по количеству комментариев
  const copiedImages = images.slice(0).sort(sortByComments);
  renderThumbnails(copiedImages);
};
const handleDefaultButton = (images) => { // Обрабатываем нажатие кнопки, применяя фильтр по умолчанию
  const debouncedFilter = debounce(applyDefaultFilter(images), DEBOUNCE_DELAY);
  filterDefaultEl.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};
const handleRandomButton = (images, count) => { // Обрабатываем нажатие кнопки, применяя рандомный фильтр
  const debouncedFilter = debounce(applyRandomFilter(images, count), DEBOUNCE_DELAY);
  filterRandomEl.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};
const handleDiscussedButton = (images) => { // Обрабатываем нажатие кнопки, применяя фильтр по обсуждению
  const debouncedFilter = debounce(applyDiscussedFilter(images), DEBOUNCE_DELAY);
  filterDiscussedEl.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};

export {handleDefaultButton, handleRandomButton, handleDiscussedButton, MAX_RANDOM_PHOTO_COUNT};
