const uploadedImage = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effects = {
  chrome: {filter: 'grayscale', min: 0, max: 1, start: 1, step: 0.01},
  sepia: {filter: 'sepia', min: 0, max: 1, start: 1, step: 0.01},
  marvin: {filter: 'invert', min: 0, max: 1, start: 1, step: 0.01},
  phobos: {filter: 'blur', min: 0, max: 3, start: 3, step: 0.01},
  heat: {filter: 'brightness', min: 1, max: 3, start: 3, step: 0.01}
};
noUiSlider.create(effectSlider, { // Инициализируем слайдер
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.01,
  connect: 'lower',
  format : {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});
effectSlider.noUiSlider.on('update', () => { // Обновляем значение при смене ползунка
  effectValue.value = effectSlider.noUiSlider.get();
});
const undoEffects = () => { // Сброс стиля изображения
  uploadedImage.removeAttribute('style');
  effectLevel.classList.add('hidden');
};
const setImageStyle = (effect) => { // Применяем эффект к изображению
  if (effect === 'none') {
    undoEffects();
  } else {
    const {filter, min, max, start, step} = effects[effect]; // Получаем свойства эффекта
    effectLevel.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions({ // Обновляем параметры слайдера
      range: {
        min,
        max
      },
      start,
      step,
      connect: 'lower'
    });
    effectSlider.noUiSlider.on('update', () => { // Применяем фильтр при имзенении эффекта
      uploadedImage.style.filter = `${filter}(${effectValue.value}${effect === 'phobos' ? 'px' : ''})`;
    });
  }
};
const selectImageEffect = (evt) => { // Обработка выбора эффекта
  const selectedInput = evt.target.closest('.effects__radio'); // Находим выбранный элемент радиокнопки
  if (selectedInput) {
    const selectedEffect = selectedInput.value;
    setImageStyle(selectedEffect);
  }
};
const setupEffects = () => { // Инициализируем эффекты
  undoEffects();
  effectsList.addEventListener('change', selectImageEffect);
};

export {setupEffects};
