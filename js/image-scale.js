const uploadImage = document.querySelector('.img-upload__preview');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const updateScale = (scale) => { // Функция для обновления отображения значения масштаба
  scaleValue.value = `${scale * 100}%`;
  uploadImage.style.transform = `scale(${scale})`;
};
const changeScale = (amount) => { // Функция для изменения значения масштаба
  let scale = parseFloat(scaleValue.value) / 100;
  scale += amount;
  scale = Math.max(Math.min(scale, 1), 0.25); // Ограничиваем шкалу между минимально и максимально допустимыми значениями
  updateScale(scale);
};
scaleSmaller.addEventListener('click', () => {
  changeScale(-0.25);
});
scaleBigger.addEventListener('click', () => {
  changeScale(0.25);
});
function resetScale () { // Функция для сброса масштаба изображения
  uploadImage.style.transform = '';
}

export {updateScale, resetScale};
