import {
  effectLevelSliderElement,
  effectLevelValueElement,
  effectRadioButtonElement,
  nonEffectButtonElement,
  uploadPrewiewInputElement,
  effectListElement,
  Effects
} from './source.js';

const createFilterOnElement = () => {
  let checkedElement;
  effectRadioButtonElement.forEach((elem) => {
    if (elem.checked) {
      checkedElement = elem.value;
    }
  }); return checkedElement;
};

const getCurrentEffectData = () => Effects[createFilterOnElement()];
const createCurrentSlider = () => effectLevelSliderElement.noUiSlider.updateOptions(getCurrentEffectData());

export const changePictureEffect = () => {
  noUiSlider.create(effectLevelSliderElement, Effects.none);
  effectLevelSliderElement.classList.add('hidden');
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
    uploadPrewiewInputElement.firstElementChild.style.filter = `${getCurrentEffectData().style(effectLevelValueElement.value)}`;
  });
  const onEffectListChange = (evt) => {
    if (evt.target === nonEffectButtonElement) {
      effectLevelSliderElement.classList.add('hidden');
      uploadPrewiewInputElement.firstElementChild.style.filter = 'none';
    } else {
      effectLevelSliderElement.classList.remove('hidden');
    }
    effectLevelSliderElement.noUiSlider.set(0);
    createCurrentSlider();

  };
  effectListElement.addEventListener('change', onEffectListChange);
};
