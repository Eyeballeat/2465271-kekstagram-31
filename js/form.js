import {
  formForUploadImage,
  buttonForCancel,
  uploadImageInput,
  uploadOverlay,
  textInHashTagInput,
  textInDescriptionInput,
  uploadPrewiewInput,
  effectLevelSlider,
  NonEffectButton,
  scaleValueField,
  FULL_IMAGE_SIZE,
}
  from './source.js';
import {
  checkHashtagStringLength,
  checkHashtagOnCorrect,
  checkHashtagOnRepeat,
  checkCommentOnLength,
  blockSubmitButton
}
  from './util.js';
import { onImageResizing } from './picture-redactor.js';
import { sliderEffectHandler } from './effect.js';
import { sendData } from './api.js';

const pristine = new Pristine(formForUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const definitionHashtag = () => textInHashTagInput.value.toLowerCase().split(' ');
const validationHashtagLength = () => checkHashtagStringLength();
const validationCommentField = () => checkCommentOnLength(textInDescriptionInput);
const validationCorrectHashtag = () => checkHashtagOnCorrect(textInHashTagInput);
const validationNoRepeatHashtag = () => checkHashtagOnRepeat();

pristine.addValidator(textInHashTagInput, validationHashtagLength, 'превышено количество хэштегов');
pristine.addValidator(textInDescriptionInput, validationCommentField, 'длина комментария больше 140 символов');
pristine.addValidator(textInHashTagInput, validationCorrectHashtag, 'введён невалидный хэштег');
pristine.addValidator(textInHashTagInput, validationNoRepeatHashtag, 'хэштеги повторяются');

const closePictureHandlerWindow = (evt) => {
  if (evt.target === textInHashTagInput || evt.target === textInDescriptionInput) {
    evt.stopPropagation();
  } else if (evt.target === buttonForCancel || evt.key === 'Escape' || evt.target === formForUploadImage) {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    textInHashTagInput.value = '';
    textInDescriptionInput.value = '';
    uploadImageInput.value = '';
    uploadPrewiewInput.firstElementChild.style = 'none';
    scaleValueField.value = `${FULL_IMAGE_SIZE}%`;
    NonEffectButton.checked = 'checked';
    effectLevelSlider.classList.add('hidden');
    document.removeEventListener('keydown', closePictureHandlerWindow);
  }
};

const sendCurrentPostData = (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if(isValide){
    blockSubmitButton();
    sendData(evt);
  }
};

const validationOfForm = () => {
  formForUploadImage.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    formForUploadImage.addEventListener('submit', sendCurrentPostData);
    textInHashTagInput.addEventListener('focus', closePictureHandlerWindow);
    textInDescriptionInput.addEventListener('focus', closePictureHandlerWindow);
    buttonForCancel.addEventListener('click', closePictureHandlerWindow);
    document.addEventListener('keydown', closePictureHandlerWindow);
  });
};

onImageResizing();
sliderEffectHandler();

export {
  definitionHashtag,
  validationOfForm,
  closePictureHandlerWindow
};
