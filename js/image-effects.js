const uploadedImageEl = document.querySelector('.img-upload__preview img');
const effectLevelEl = document.querySelector('.img-upload__effect-level');
const effectValueEl = document.querySelector('.effect-level__value');
const effectSliderEl = document.querySelector('.effect-level__slider');
const effectsListEl = document.querySelector('.effects__list');
const effects = {
  chrome: {filter: 'grayscale', min: 0, max: 1, start: 1, step: 0.1},
  sepia: {filter: 'sepia', min: 0, max: 1, start: 1, step: 0.1},
  marvin: {filter: 'invert', min: 0, max: 100, start: 100, step: 1, units: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, start: 3, step: 0.1, units: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, start: 3, step: 0.1}
};
noUiSlider.create(effectSliderEl, { // Инициализируем слайдер
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
effectSliderEl.noUiSlider.on('update', () => { // Обновляем значение при смене ползунка
  effectValueEl.value = effectSliderEl.noUiSlider.get();
});
const undoEffects = () => { // Сброс стиля изображения
  uploadedImageEl.removeAttribute('style');
  effectLevelEl.classList.add('hidden');
};
const setImageStyle = (effect) => { // Применяем эффект к изображению
  if (effect === 'none') {
    undoEffects();
  } else {
    const {filter, min, max, start, step, units} = effects[effect]; // Получаем свойства эффекта
    effectLevelEl.classList.remove('hidden');
    effectSliderEl.noUiSlider.updateOptions({ // Обновляем параметры слайдера
      range: {
        min,
        max
      },
      start,
      step,
      connect: 'lower'
    });
    effectSliderEl.noUiSlider.on('update', () => { // Применяем фильтр при изменении эффекта
      uploadedImageEl.style.filter = `${filter}(${effectValueEl.value}${units ?? ''})`;
    });
  }
};
const selectImageEffectHandler = (evt) => { // Обработка выбора эффекта
  const selectedInputEl = evt.target.closest('.effects__radio'); // Находим выбранный элемент радиокнопки
  if (selectedInputEl) {
    const selectedEffect = selectedInputEl.value;
    setImageStyle(selectedEffect);
  }
};
const setupEffects = () => { // Инициализируем эффекты
  undoEffects();
  effectsListEl.addEventListener('change', selectImageEffectHandler);
};

export {setupEffects, uploadedImageEl};
