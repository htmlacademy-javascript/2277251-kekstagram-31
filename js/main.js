import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData()
  .then((images) => {
    renderThumbnails(images);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

configureFormValidation();
