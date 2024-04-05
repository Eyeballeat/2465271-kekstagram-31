import { errorUploadMessage } from './image-sending.js';
import { onPictureCloserButtonClick } from './edit-of-user-form.js';

const onSuccessButtonClick = (evt) => {
  if (evt.target === document.querySelector('.success__button')
  || evt.target === document.querySelector('.success')) {
    onPictureCloserButtonClick(evt);
  }
};

const onErrorButtonClick = (evt) => {
  if (evt.target === document.querySelector('.error__button')
    || evt.target === document.querySelector('.error')) {
    errorUploadMessage.remove();
  }
};

export {
  onSuccessButtonClick,
  onErrorButtonClick
};
