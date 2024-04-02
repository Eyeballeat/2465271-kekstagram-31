import {
  imageUploadButtonText,
  imageUploadButtonElement,
  errorUploadTitleElement,
  successUploadTitleElement
}
  from './source.js';
import { sendData } from './api.js';
import { getTemplateElement } from './util.js';
import { pristine } from './user-form-redactor.js';

export const createSuccessUploadMessage = getTemplateElement('#success', '.success');
export const createErrorUploadMessage = getTemplateElement('#error', '.error');
// Создаем функцию вставки сообщения об ошибке загрузки изображения
const showUploadErrorMessage = (message) => {
  if (message) {
    errorUploadTitleElement.textContent = message;
  }
  document.body.append(createErrorUploadMessage);
};
// Создаем функцию вставки сообщения об удачной загрузке изображения
const showUploadSuccessMessage = (message) => {
  if (message) {
    successUploadTitleElement.textContent = message;
  }
  document.body.append(createSuccessUploadMessage);
  document.body.classList.remove('modal-open');
};
// Создаем функцию разблокировки кнопки при удачной загрузке формы изображения
const unblockSubmitButton = () => {
  imageUploadButtonElement.disabled = false;
  imageUploadButtonElement.textContent = imageUploadButtonText.IDLE;
};
// Создаем функцию разблокировки кнопки отправки формы с изображением
const blockSubmitButton = () => {
  imageUploadButtonElement.disabled = true;
  imageUploadButtonElement.textContent = imageUploadButtonText.SENDING;
};
// Создаем функцию отправки данных с формой
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
// Создаем колбэк для передачи в обработчик отправки формы
export const onCurrentPostDataSubmit = (evt) => {
  evt.preventDefault();
  const isValide = pristine.validate();
  if(isValide){
    blockSubmitButton();
    sendUserImageForm(evt);
  }
};
