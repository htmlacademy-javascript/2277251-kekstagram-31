import {uploadedImage} from './image-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const smallPreviewImages = document.querySelectorAll('.effects__preview');
const handleFileChange = (file) => {
  const fileName = file.name.toLowerCase();
  uploadedImage.src = URL.createObjectURL(file);
  FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  smallPreviewImages.forEach((preview) => {
    preview.style.backgroundImage = `url(${uploadedImage.src})`;
  });
};

export {handleFileChange};
