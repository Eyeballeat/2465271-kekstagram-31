import {
  PICTURE_SCALE_STEP,
  FULL_IMAGE_SIZE,
  MIN_IMAGE_SIZE,
  uploadPrewiewInputElement,
  scaleSmallerButtonElement,
  scaleBiggerButtonElement,
  scaleValueFieldElement,
}
  from './source.js';
/**
 * Записать значение в поле с масштабом
 * @param {number} value значение масштаба 25..100
 */
const setCurrentScaleValue = (value) => {
  const currentScaleValue = parseInt(scaleValueFieldElement.value, 10) + value;
  scaleValueFieldElement.value = `${currentScaleValue}%`;
  uploadPrewiewInputElement.firstElementChild.style.transform = `scale(${currentScaleValue / 100})`;
};
/**
 * Изменение масштаба
 */
const changePictureSize = (evt) => {
  if (evt.target === scaleSmallerButtonElement) {
    if (scaleValueFieldElement.value === `${MIN_IMAGE_SIZE}%`) {
      return;
    }
    setCurrentScaleValue(PICTURE_SCALE_STEP * -1);
  }
  if (evt.target === scaleBiggerButtonElement) {
    if (scaleValueFieldElement.value === `${FULL_IMAGE_SIZE}%`) {
      return;
    }
    setCurrentScaleValue(PICTURE_SCALE_STEP);
  }
};

export const onChangeSizeButtonClick = (evt) => changePictureSize(evt);
