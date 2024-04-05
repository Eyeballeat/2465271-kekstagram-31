import {
  formForUploadImageElement,
  buttonForCancelElement,
  uploadImageInputElement,
  uploadOverlayElement,
  textInHashTagInputElement,
  textInDescriptionInputElement,
  uploadPrewiewInputElement,
  imageEffectLevelElement,
  imageScaleFormElement,
  MAX_COMMENTS_LENGTH,
  MESSAGE_COUNT,
}
  from './source.js';
import { onChangeSizeButtonClick } from './change-image-size.js';
import { loadUserLocalImage } from './load-user-image.js';
import { onCurrentPostDataSubmit, successUploadMessage, errorUploadMessage } from './image-sending.js';
import { onSuccessButtonClick, onErrorButtonClick } from './close-modal-windows.js';
import { isEscapeButton } from './utils.js';
/**
   * Инициализация Pristine для валидации формы ввода.
   * Дока: https://pristine.js.org/
   */
const pristine = new Pristine(formForUploadImageElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);

const prepareHashtag = () => textInHashTagInputElement.value.toLowerCase().split(' ').filter ((el) => el !== '');
const checkRegularOnCorrect = (element) => /^#[a-zа-яё0-9]{1,19}$/i.test(element);
const checkCommentOnLength = () => textInDescriptionInputElement.value.length <= MAX_COMMENTS_LENGTH;
const checkHashtagOnCorrect = () =>
  prepareHashtag().every((elem) =>
    textInHashTagInputElement.value.length === 0 ||
    checkRegularOnCorrect(elem));
const checkHashtagOnRepeat = () => new Set(prepareHashtag()).size === prepareHashtag().length;
const checkHashtagStringLength = () => prepareHashtag().length <= MESSAGE_COUNT;

const onPictureCloserButtonClick = () => {
  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  imageEffectLevelElement.style.display = 'none';
  uploadPrewiewInputElement.firstElementChild.style = 'none';
  pristine.reset();
  formForUploadImageElement.reset();
  successUploadMessage.remove();
  document.removeEventListener('keydown', onEscapeButtonPress);
};

function onEscapeButtonPress (evt) {
  if (document.activeElement === textInHashTagInputElement
    || document.activeElement === textInDescriptionInputElement) {
    evt.stopPropagation();
  } else if (document.querySelector('.error')) {
    errorUploadMessage.remove();
  } else if(isEscapeButton(evt)) {
    onPictureCloserButtonClick();
  }
}

const checkUserForm = () => {
  formForUploadImageElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadImageInputElement.addEventListener('change', loadUserLocalImage());
    imageScaleFormElement.addEventListener('click', onChangeSizeButtonClick);
    formForUploadImageElement.addEventListener('submit', onCurrentPostDataSubmit);
    buttonForCancelElement.addEventListener('click', onPictureCloserButtonClick);
    document.addEventListener('keydown', onEscapeButtonPress);
    successUploadMessage.addEventListener('click', onSuccessButtonClick);
    errorUploadMessage.addEventListener('click', onErrorButtonClick);
  });
};

pristine.addValidator(textInHashTagInputElement, checkHashtagStringLength, 'количество хэштегов не должно превышать пяти');
pristine.addValidator(textInDescriptionInputElement, checkCommentOnLength, 'длина комментария не должна превышать 140 символов');
pristine.addValidator(textInHashTagInputElement, checkHashtagOnCorrect, 'хэштег должен начинаться с # и быть не длинее 20 символов');
pristine.addValidator(textInHashTagInputElement, checkHashtagOnRepeat, 'хэштеги не должны повторяться');

export {
  checkUserForm,
  pristine,
  onPictureCloserButtonClick
};
