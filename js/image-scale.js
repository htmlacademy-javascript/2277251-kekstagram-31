const uploadImage = document.querySelector('.img-upload__preview');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const DEFAULT_SCALE = 1; // Значение по умолчанию для масштаба изображения
const SCALE_STEP = 0.25; // Значение шага масштаба
const updateScale = (scale) => { // Функция для обновления отображения значения масштаба
  scaleValue.value = `${scale * 100}%`;
  uploadImage.style.transform = `scale(${scale})`;
};
const changeScale = (amount) => { // Функция для изменения значения масштаба
  let scale = parseFloat(scaleValue.value) / 100;
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
function resetScale () { // Функция для сброса масштаба изображения
  uploadImage.style.transform = '';
}

export {DEFAULT_SCALE, updateScale, resetScale};
