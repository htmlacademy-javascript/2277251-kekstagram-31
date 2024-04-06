const DEFAULT_SCALE = 1; // Значение по умолчанию для масштаба изображения
const SCALE_STEP = 0.25; // Значение шага масштаба
const SCALE_PERCENTAGE = 100; // Процентное значение, используемое для отображения масштаба
const uploadImage = document.querySelector('.img-upload__preview img');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const updateScale = (scale) => { // Функция для обновления отображения значения масштаба
  scaleValue.value = `${scale * SCALE_PERCENTAGE}%`;
  uploadImage.style.transform = `scale(${scale})`;
};
const changeScale = (amount) => { // Функция для изменения значения масштаба
  let scale = parseFloat(scaleValue.value) / SCALE_PERCENTAGE;
  scale += amount;
  scale = Math.max(Math.min(scale, 1), SCALE_STEP); // Ограничиваем шкалу между минимально и максимально допустимыми значениями
  updateScale(scale);
};
scaleSmaller.addEventListener('click', () => {
  changeScale(-SCALE_STEP);
});
scaleBigger.addEventListener('click', () => {
  changeScale(SCALE_STEP);
});
const resetScale = () => { // Функция для сброса масштаба изображения
  uploadImage.style.transform = '';
};

export {DEFAULT_SCALE, updateScale, resetScale};
