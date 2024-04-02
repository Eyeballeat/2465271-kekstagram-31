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
import { onPictureSizeClick } from './image-size-redactor.js';
import { onUserImageChange } from './selected-image-loader.js';
import { onCurrentPostDataSubmit, createSuccessUploadMessage, createErrorUploadMessage } from './user-image-submitter.js';
import { onSuccessMessageClick, onErrorMessageClick } from './alert-window-closer.js';
import { isEscapeButton } from './util.js';
// Инициализируем валидатор PristineJS
const pristine = new Pristine(formForUploadImageElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);
// Создаем функции проверки вводимых данных
const prepareHashtag = () => textInHashTagInputElement.value.toLowerCase().split(' ').filter ((el) => el !== '');
const checkRegularOnCorrect = (element) => /^#[a-zа-яё0-9]{1,19}$/i.test(element);
const checkCommentOnLength = () => textInDescriptionInputElement.value.length <= MAX_COMMENTS_LENGTH;
const checkHashtagOnCorrect = () =>
  prepareHashtag().every((elem) =>
    textInHashTagInputElement.value.length === 0 ||
    checkRegularOnCorrect(elem));
const checkHashtagOnRepeat = () => new Set(prepareHashtag()).size === prepareHashtag().length;
const checkHashtagStringLength = () => prepareHashtag().length <= MESSAGE_COUNT;
// Создаем функцию закрытия окна просмотрщика
const onPictureCloserClick = () => {
  document.body.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  imageEffectLevelElement.style.display = 'none';
  uploadPrewiewInputElement.firstElementChild.style = 'none';
  pristine.reset();
  formForUploadImageElement.reset();
  createSuccessUploadMessage.remove();
  document.removeEventListener('keydown', onEscapePress);
};
// Создаем колбэк для закрытия окна по нажатию клавиши Escape
function onEscapePress (evt) {
  if (document.activeElement === textInHashTagInputElement
    || document.activeElement === textInDescriptionInputElement) {
    evt.stopPropagation();
  } else if (document.querySelector('.error')) {
    createErrorUploadMessage.remove();
  } else if(isEscapeButton(evt)) {
    onPictureCloserClick();
  }
}
// Создаем функцию работы формы окна просмотра
const validationOfForm = () => {
  formForUploadImageElement.addEventListener('change', () => {
    uploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadImageInputElement.addEventListener('change', onUserImageChange());
    imageScaleFormElement.addEventListener('click', onPictureSizeClick);
    formForUploadImageElement.addEventListener('submit', onCurrentPostDataSubmit);
    buttonForCancelElement.addEventListener('click', onPictureCloserClick);
    document.addEventListener('keydown', onEscapePress);
    createSuccessUploadMessage.addEventListener('click', onSuccessMessageClick);
    createErrorUploadMessage.addEventListener('click', onErrorMessageClick);
  });
};
// описываем порядок отработки валидации
pristine.addValidator(textInHashTagInputElement, checkHashtagStringLength, 'количество хэштегов не должно превышать пяти');
pristine.addValidator(textInDescriptionInputElement, checkCommentOnLength, 'длина комментария не должна превышать 140 символов');
pristine.addValidator(textInHashTagInputElement, checkHashtagOnCorrect, 'хэштег должен начинаться с # и быть не длинее 20 символов');
pristine.addValidator(textInHashTagInputElement, checkHashtagOnRepeat, 'хэштеги не должны повторяться');

export {
  validationOfForm,
  pristine,
  onPictureCloserClick
};
