import { createErrorUploadMessage } from './user-image-submitter.js';
import { isEscapeButton } from './util.js';
import { onPictureCloserClick } from './user-form-redactor.js';
// Создаем колбэк закрытия окна алерта удачной отправки формы
const onSuccessMessageClick = (evt) => {
  if (evt.target === document.querySelector('.success__button')
  || evt.target === document.querySelector('.success')) {
    onPictureCloserClick(evt);
  }
};
// Создаем колбэк окна алерта неудачной отправки формы
const onErrorMessageClick = (evt) => {
  if (isEscapeButton(evt)) {
    createErrorUploadMessage.remove();
  } else if (evt.target === document.querySelector('.error__button')
    || evt.target === document.querySelector('.error')) {
    createErrorUploadMessage.remove();
  }
};

export {
  onSuccessMessageClick,
  onErrorMessageClick
};
