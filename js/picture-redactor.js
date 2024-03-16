import {
  PICTURE_SCALE_STEP,
  FULL_IMAGE_SIZE,
  MIN_IMAGE_SIZE,
  uploadPrewiewInput,
  scaleSmallerButton,
  scaleBiggerButton,
  scaleValueField,
  imageScaleForm
}
  from './source.js';

const getCurrentScaleValue = (value) => {
  let currentScaleValue = parseInt(scaleValueField.value, 10);
  currentScaleValue += value;
  scaleValueField.value = `${currentScaleValue}%`;
  uploadPrewiewInput.firstElementChild.style.transform = `scale(${currentScaleValue / 100})`;
};

export const onImageResizing = () => {
  imageScaleForm.addEventListener('click', (evt) => {
    if (evt.target === scaleSmallerButton) {
      if (scaleValueField.value === `${MIN_IMAGE_SIZE}%`) {
        return;
      }
      getCurrentScaleValue(-PICTURE_SCALE_STEP);
    }
    if (evt.target === scaleBiggerButton) {
      if (scaleValueField.value === `${FULL_IMAGE_SIZE}%`) {
        return;
      }
      getCurrentScaleValue(PICTURE_SCALE_STEP);
    }
  });
};
