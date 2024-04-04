import { errorUploadMessage } from './image-sending.js';
import { onPictureCloserClick } from './edit-of-user-form.js';

const onSuccessMessageClick = (evt) => {
  if (evt.target === document.querySelector('.success__button')
  || evt.target === document.querySelector('.success')) {
    onPictureCloserClick(evt);
  }
};

const onErrorMessageClick = (evt) => {
  if (evt.target === document.querySelector('.error__button')
    || evt.target === document.querySelector('.error')) {
    errorUploadMessage.remove();
  }
};

export {
  onSuccessMessageClick,
  onErrorMessageClick
};
