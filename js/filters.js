import {debounce, DEBOUNCE_DELAY} from './util.js';
import {renderThumbnails} from './thumbnails.js';

const MAX_RANDOM_PHOTO_COUNT = 10;
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const setActiveButton = (currentButton) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (currentButton !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  currentButton.classList.add('img-filters__button--active');
};
const sortByComments = (image1, image2) => image2.comments.length - image1.comments.length;
const applyDefaultFilter = (images) => () => {
  renderThumbnails(images);
};
const applyRandomFilter = (images) => () => {
  const shuffledImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_RANDOM_PHOTO_COUNT);
  renderThumbnails(shuffledImages);
};
const applyDiscussedFilter = (images) => () => {
  const copiedImages = images.slice(0).sort(sortByComments);
  renderThumbnails(copiedImages);
};
const handleDefaultButton = (images) => {
  const debouncedFilter = debounce(applyDefaultFilter(images), DEBOUNCE_DELAY);
  filterDefault.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};
const handleRandomButton = (images, count) => {
  const debouncedFilter = debounce(applyRandomFilter(images, count), DEBOUNCE_DELAY);
  filterRandom.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};
const handleDiscussedButton = (images) => {
  const debouncedFilter = debounce(applyDiscussedFilter(images), DEBOUNCE_DELAY);
  filterDiscussed.addEventListener('click', (evt) => {
    setActiveButton(evt.target);
    debouncedFilter();
  });
};

export {handleDefaultButton, handleRandomButton, handleDiscussedButton, MAX_RANDOM_PHOTO_COUNT};
