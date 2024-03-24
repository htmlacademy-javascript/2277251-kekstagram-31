import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';
import {configureFormValidation} from './form.js';
import {updateScale} from './image-scale.js';

renderThumbnails(createPhotos());
configureFormValidation();
updateScale(1);
