import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((images) => {
    renderThumbnails(images);
  });


configureFormValidation();
