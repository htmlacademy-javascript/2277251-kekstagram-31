import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {getData} from './api.js';
import {showDataError} from './alerts.js';
import {MAX_RANDOM_PHOTO_COUNT, handleDefaultButton, handleRandomButton, handleDiscussedButton} from './filters.js';

getData()
  .then((images) => {
    renderThumbnails(images);
    handleDefaultButton(images);
    handleRandomButton(images, MAX_RANDOM_PHOTO_COUNT);
    handleDiscussedButton(images);
  })
  .then(() => {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

configureFormValidation();
