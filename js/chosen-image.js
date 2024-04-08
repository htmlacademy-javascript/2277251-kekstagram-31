import {uploadedImageEl} from './image-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const smallPreviewImagesEl = document.querySelectorAll('.effects__preview');
const handleFileChange = (file) => {
  const fileName = file.name.toLowerCase();
  uploadedImageEl.src = URL.createObjectURL(file);
  FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  smallPreviewImagesEl.forEach((preview) => {
    preview.style.backgroundImage = `url(${uploadedImageEl.src})`;
  });
};

export {handleFileChange};
