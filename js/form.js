import {
  formForUploadImageElement,
  buttonForCancelElement,
  uploadImageInputElement,
  uploadOverlayElement,
  textInHashTagInputElement,
  textInDescriptionInputElement,
  uploadPrewiewInputElement,
  effectLevelSliderElement,
  nonEffectButtonElement,
  scaleValueFieldElement,
  imageUploadButtonElement,
  imageUploadButtonText,
  FULL_IMAGE_SIZE,
}
  from './source.js';
import {
  checkHashtagStringLength,
  checkHashtagOnCorrect,
  checkHashtagOnRepeat,
  checkCommentOnLength,
}
  from './util.js';
import { changePictureSize } from './picture-redactor.js';
import { changePictureEffect } from './effect.js';
import { sendData } from './api.js';
import { loadUserImage } from './user-image.js';

const pristine = new Pristine(formForUploadImageElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const definitionHashtag = () => textInHashTagInputElement.value.toLowerCase().split(' ');
const validationHashtagLength = () => checkHashtagStringLength();
const validationCommentField = () => checkCommentOnLength(textInDescriptionInputElement);
const validationCorrectHashtag = () => checkHashtagOnCorrect(textInHashTagInputElement);
const validationNoRepeatHashtag = () => checkHashtagOnRepeat();

pristine.addValidator(textInHashTagInputElement, validationHashtagLength, 'превышено количество хэштегов');
pristine.addValidator(textInDescriptionInputElement, validationCommentField, 'длина комментария больше 140 символов');
pristine.addValidator(textInHashTagInputElement, validationCorrectHashtag, 'введён невалидный хэштег');
pristine.addValidator(textInHashTagInputElement, validationNoRepeatHashtag, 'хэштеги повторяются');

const closePictureHandlerWindow = (evt) => {
  if (evt.target === textInHashTagInputElement
    || evt.target === textInDescriptionInputElement) {
    evt.stopPropagation();
  } else if (evt.target === buttonForCancelElement
    || evt.key === 'Escape'
    || evt.target === formForUploadImageElement) {
    uploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    textInHashTagInputElement.value = '';
    textInDescriptionInputElement.value = '';
    uploadImageInputElement.value = '';
    uploadPrewiewInputElement.firstElementChild.style = 'none';
    scaleValueFieldElement.value = `${FULL_IMAGE_SIZE}%`;
    nonEffectButtonElement.checked = 'checked';
    effectLevelSliderElement.classList.add('hidden');
    document.removeEventListener('keydown', closePictureHandlerWindow);
  }
};

const blockSubmitButton = () => {
  imageUploadButtonElement.disabled = true;
  imageUploadButtonElement.textContent = imageUploadButtonText.SENDING;
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
  formForUploadImageElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    loadUserImage();
    formForUploadImageElement.addEventListener('submit', sendCurrentPostData);
    textInHashTagInputElement.addEventListener('focus', closePictureHandlerWindow);
    textInDescriptionInputElement.addEventListener('focus', closePictureHandlerWindow);
    buttonForCancelElement.addEventListener('click', closePictureHandlerWindow);
    document.addEventListener('keydown', closePictureHandlerWindow);
  });
};

changePictureSize();
changePictureEffect();

export {
  definitionHashtag,
  validationOfForm,
  closePictureHandlerWindow
};
