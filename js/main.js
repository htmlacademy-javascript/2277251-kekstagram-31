import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {getData} from './api.js';
import {showDataError} from './alerts.js';

getData()
  .then((images) => {
    renderThumbnails(images);
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
