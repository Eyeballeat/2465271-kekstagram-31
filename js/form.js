import {
  formForUploadImage,
  buttonForCancel,
  uploadImageInput,
  uploadOverlay,
  textInHashTagInput,
  textInDescriptionInput,
}
  from './source.js';
import {
  checkHashtagStringLength,
  checkHashtagOnCorrect,
  checkHashtagOnRepeat,
  checkCommentOnLength,
}
  from './util.js';

const pristine = new Pristine(formForUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const closePictureHandlerWindow = (evt) => {
  if (evt.target === textInHashTagInput || evt.target === textInDescriptionInput) {
    evt.stopPropagation();
  } else if (evt.target === buttonForCancel || evt.key === 'Escape') {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadImageInput.value = '';
    document.removeEventListener('keydown', closePictureHandlerWindow);
  }
};

const sendCurrentPostData = (evt) => {
  const isValide = pristine.validate();
  if(!isValide){
    evt.preventDefault();
  }
};

const definitionHashtag = () => textInHashTagInput.value.split(' ');
const validationHashtagLength = () => checkHashtagStringLength();
const validationCommentField = () => checkCommentOnLength(textInDescriptionInput);
const validationCorrectHashtag = () => checkHashtagOnCorrect(textInHashTagInput);
const validationNoRepeatHashtag = () => checkHashtagOnRepeat();

pristine.addValidator(textInHashTagInput, validationHashtagLength, 'превышено количество хэштегов');
pristine.addValidator(textInDescriptionInput, validationCommentField, 'длина комментария больше 140 символов');
pristine.addValidator(textInHashTagInput, validationCorrectHashtag, 'введён невалидный хэштег');
pristine.addValidator(textInHashTagInput, validationNoRepeatHashtag, 'хэштеги повторяются');

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

export {
  definitionHashtag,
  validationOfForm
};
