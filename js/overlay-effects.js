import {
  effectLevelSliderElement,
  effectLevelValueElement,
  nonEffectButtonElement,
  uploadPrewiewInputElement,
  imageEffectLevelElement,
  effectListElement,
} from './source.js';
/**
 * Вставить значение эффекта в поля UiSlider
 * @param {number} range минимальное и максимальное значение слайдера
 * @param {number} start начальное значение слайдера
 * @param {number} step шаг слайдера
 * @param {string} connect закрашивание слайдера
 * @param {string} effect наименование накладываемого эффекта
 * @param {string} sign еденица измерения значения
 * @param {number} value значение эффекта
 */
const insertCurrentEffectValue = (range = {min: 0, max: 0}, start = 0, step = 0, connect = 'lower', effect = 'none', sign = '') =>
  ({
    range,
    start,
    step,
    connect,
    chooseStyle: function (value) {
      return `${effect}(${value}${sign})`;
    }
  });

const Effects = {
  chrome: insertCurrentEffectValue({min: 0, max: 1}, 1, 0.1, 'lower','grayscale'),
  sepia: insertCurrentEffectValue({min: 0, max: 1}, 1, 0.1, 'lower','sepia'),
  marvin: insertCurrentEffectValue({min: 0, max: 100}, 100, 1, 'lower','invert','%'),
  phobos: insertCurrentEffectValue({min: 0, max: 3}, 3, 0.1, 'lower','blur','px'),
  heat: insertCurrentEffectValue({min: 1, max: 3}, 3, 0.1, 'lower','brightness'),
  none: insertCurrentEffectValue(),
};

const getCheckedElementValue = () => effectListElement.querySelector('input[type="radio"][name="effect"]:checked').value;

const onEffectListChange = (evt) => {
  if (evt.target === nonEffectButtonElement) {
    imageEffectLevelElement.style.display = 'none';
    uploadPrewiewInputElement.querySelector('img').style.filter = 'none';
  } else {
    effectLevelSliderElement.classList.remove('hidden');
    imageEffectLevelElement.style.display = '';
  }
  effectLevelSliderElement.noUiSlider.updateOptions(Effects[getCheckedElementValue()]);
};

export const changePictureEffect = () => {
  noUiSlider.create(effectLevelSliderElement, Effects.none);
  imageEffectLevelElement.style.display = 'none';
  effectLevelSliderElement.noUiSlider.on('update', () => {
    const effectLevelValue = parseFloat(effectLevelSliderElement.noUiSlider.get());
    const getEffectValue = (value) => {
      if (Number.isInteger(parseFloat(value))) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    };
    effectLevelValueElement.value = getEffectValue(effectLevelValue);
    uploadPrewiewInputElement.querySelector('img').style.filter = `${Effects[getCheckedElementValue()].chooseStyle(effectLevelValueElement.value)}`;
  });
  effectListElement.addEventListener('change', onEffectListChange);
};
