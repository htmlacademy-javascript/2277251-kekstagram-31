import {uploadedImageEl} from './image-effects.js';

const DEFAULT_SCALE = 1; // Значение по умолчанию для масштаба изображения
const SCALE_STEP = 0.25; // Значение шага масштаба
const SCALE_PERCENTAGE = 100; // Процентное значение, используемое для отображения масштаба
const scaleSmallerEl = document.querySelector('.scale__control--smaller');
const scaleBiggerEl = document.querySelector('.scale__control--bigger');
const scaleValueEl = document.querySelector('.scale__control--value');
const updateScale = (scale) => { // Функция для обновления отображения значения масштаба
  scaleValueEl.value = `${scale * SCALE_PERCENTAGE}%`;
  uploadedImageEl.style.transform = `scale(${scale})`;
};
const changeScale = (amount) => { // Функция для изменения значения масштаба
  let scale = parseFloat(scaleValueEl.value) / SCALE_PERCENTAGE;
  scale += amount;
  scale = Math.max(Math.min(scale, 1), SCALE_STEP); // Ограничиваем шкалу между минимально и максимально допустимыми значениями
  updateScale(scale);
};
scaleSmallerEl.addEventListener('click', () => {
  changeScale(-SCALE_STEP);
});
scaleBiggerEl.addEventListener('click', () => {
  changeScale(SCALE_STEP);
});
const resetScale = () => { // Функция для сброса масштаба изображения
  uploadedImageEl.style.transform = '';
};

export {DEFAULT_SCALE, updateScale, resetScale};
