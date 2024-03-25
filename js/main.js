import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';

renderThumbnails(createPhotos());
configureFormValidation();
