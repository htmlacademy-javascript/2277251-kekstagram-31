import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {getData} from './api.js';
import {showDataError} from './alerts.js';

getData()
  .then((images) => {
    renderThumbnails(images);
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

configureFormValidation();
