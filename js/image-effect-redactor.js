import {
  effectLevelSliderElement,
  effectLevelValueElement,
  nonEffectButtonElement,
  uploadPrewiewInputElement,
  imageEffectLevelElement,
  effectListElement,
  Effects
} from './source.js';
// Создаем функции получения данных из стейта эфектов
const createFilterOnElement = () => effectListElement.querySelector('input[type="radio"][name="effect"]:checked').value;
const createCurrentSlider = () => effectLevelSliderElement.noUiSlider.updateOptions(Effects[createFilterOnElement()]);
// Создаем функцию наложения эфектов на изображение
export const changePictureEffect = () => {
  const onEffectListChange = (evt) => {
    if (evt.target === nonEffectButtonElement) {
      imageEffectLevelElement.style.display = 'none';
    } else {
      effectLevelSliderElement.classList.remove('hidden');
      imageEffectLevelElement.style.display = '';
    }
    createCurrentSlider();
  };
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
    uploadPrewiewInputElement.querySelector('img').style.filter = `${Effects[createFilterOnElement()].style(effectLevelValueElement.value)}`;
  });
  effectListElement.addEventListener('change', onEffectListChange);
};
