import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {getData} from './api.js';
import {showErrorAlert} from './util.js';

getData()
  .then((images) => {
    renderThumbnails(images);
  })
  .catch(
    (err) => {
      showErrorAlert(err.message);
    }
  );

configureFormValidation();
