import {
  ImageUploadButtonText,
  imageUploadButtonElement,
  errorUploadTitleElement,
  successUploadTitleElement
}
  from './source.js';
import { sendData } from './api.js';
import { getTemplateElement } from './utils.js';
import { pristine } from './edit-of-user-form.js';

const successUploadMessage = getTemplateElement('#success', '.success');
const errorUploadMessage = getTemplateElement('#error', '.error');

const showUploadErrorMessage = (message) => {
  if (message) {
    errorUploadTitleElement.textContent = message;
  }
  document.body.append(errorUploadMessage);
};

const showUploadSuccessMessage = (message) => {
  if (message) {
    successUploadTitleElement.textContent = message;
  }
  document.body.append(successUploadMessage);
  document.body.classList.remove('modal-open');
};

const unblockSubmitButton = () => {
  imageUploadButtonElement.disabled = false;
  imageUploadButtonElement.textContent = ImageUploadButtonText.IDLE;
};

const blockSubmitButton = () => {
  imageUploadButtonElement.disabled = true;
  imageUploadButtonElement.textContent = ImageUploadButtonText.SENDING;
};

const sendUserImageForm = (evt) => {
  const formData = new FormData(evt.target);
  sendData(formData)
    .then(() => {
      showUploadSuccessMessage();
    })
    .catch((err) => {
      showUploadErrorMessage(err.Text);
    })
    .finally(unblockSubmitButton);
};

const onCurrentPostDataSubmit = (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if(isValide){
    blockSubmitButton();
    sendUserImageForm(evt);
  }
};

export {
  errorUploadMessage,
  successUploadMessage,
  onCurrentPostDataSubmit
};
