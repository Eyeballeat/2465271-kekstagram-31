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
// Создаем функцию получения данных и записи их в элемент вывода
const getCurrentScaleValue = (value) => {
  let currentScaleValue = parseInt(scaleValueFieldElement.value, 10);
  currentScaleValue += value;
  scaleValueFieldElement.value = `${currentScaleValue}%`;
  uploadPrewiewInputElement.firstElementChild.style.transform = `scale(${currentScaleValue / 100})`;
};
// Создаем функцию для изменения изображения
const changePictureSize = (evt) => {
  if (evt.target === scaleSmallerButtonElement) {
    if (scaleValueFieldElement.value === `${MIN_IMAGE_SIZE}%`) {
      return;
    }
    getCurrentScaleValue(-PICTURE_SCALE_STEP);
  }
  if (evt.target === scaleBiggerButtonElement) {
    if (scaleValueFieldElement.value === `${FULL_IMAGE_SIZE}%`) {
      return;
    }
    getCurrentScaleValue(PICTURE_SCALE_STEP);
  }
};
// Создаем колбэк для передачи в обработчик
export const onPictureSizeClick = (evt) => changePictureSize(evt);
