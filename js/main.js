import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation, updateScale} from './form.js';

renderThumbnails(createPhotos());
configureFormValidation();
updateScale(1);
