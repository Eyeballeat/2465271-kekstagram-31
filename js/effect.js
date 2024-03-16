import {
  effectLevelSlider,
  effectLevelValue,
  effectRadioButton,
  NonEffectButton,
  uploadPrewiewInput,
  effectList,
  effects
} from './source.js';

const createFilterOnElement = () => {
  let checkedElement;
  effectRadioButton.forEach((elem) => {
    if (elem.checked) {
      checkedElement = elem.value;
    }
  }); return checkedElement;
};

const currentEffectData = () => effects[createFilterOnElement()];
const createCurrentSlider = () => effectLevelSlider.noUiSlider.updateOptions(currentEffectData());

export const sliderEffectHandler = () => {
  noUiSlider.create(effectLevelSlider, effects.none);
  effectLevelSlider.classList.add('hidden');
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    uploadPrewiewInput.firstElementChild.style.filter = `${currentEffectData().style(effectLevelValue.value)}`;
  });

  const onEffectChange = (evt) => {
    if (evt.target === NonEffectButton) {
      effectLevelSlider.classList.add('hidden');
      uploadPrewiewInput.firstElementChild.style.filter = 'none';
    } else {
      effectLevelSlider.classList.remove('hidden');
    }
    effectLevelSlider.noUiSlider.set(0);
    createCurrentSlider();

  };
  effectList.addEventListener('change', onEffectChange);
};
