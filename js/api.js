import { insertImageElement } from './canvas.js';
import { showPictureFilterElement } from './image-filter.js';
import { setPostsData } from './state.js';
import {
  validationOfForm,
  closePictureHandlerWindow
}
  from './form.js';
import {
  errorUploadMessageElement,
  successUploadMessageElement,
  errorUploadUserImageElement,
  imageUploadButtonElement,
  imageUploadButtonText,
}
  from './source.js';

const closeAlertOfUpload = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  } if (evt.target === document.querySelector('.success__inner')
  || evt.target === document.querySelector('.success__title')) {
    return;
  }
  document.body.lastElementChild.remove();
  document.body.removeEventListener('click', closeAlertOfUpload);
  document.body.removeEventListener('keydown', closeAlertOfUpload);
};

const showAlertOfUpload = (data) => {
  const template = data.cloneNode(true);
  document.body.append(template);
  document.body.addEventListener('click', closeAlertOfUpload);
  document.body.addEventListener('keydown', closeAlertOfUpload);
};

const closeAlertOfLoad = () => {
  document.body.lastElementChild.remove();
};

const showAlertOfLoad = (data) => {
  const template = data.cloneNode(true);
  document.body.append(template);
  setTimeout(closeAlertOfLoad, 5000);
};

const unblockSubmitButton = () => {
  imageUploadButtonElement.disabled = false;
  imageUploadButtonElement.textContent = imageUploadButtonText.IDLE;
};

const getData = async (cb, number) => {
  try {
    const response = await fetch('https://31.javascript.htmlacademy.pro/kekstagram/data');
    const data = await response.json();
    setPostsData(data);
    insertImageElement(data, cb, number);
    validationOfForm();
    showPictureFilterElement();
  } catch (e) {
    showAlertOfLoad(errorUploadUserImageElement);
  }
};

const sendData = async (evt) => {
  try {
    const formData = new FormData(evt.target);
    await fetch('https://31.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      });
    showAlertOfUpload(successUploadMessageElement);
    closePictureHandlerWindow(evt);
  } catch (e) {
    showAlertOfUpload(errorUploadMessageElement);
  } finally {
    unblockSubmitButton();
  }
};

export {
  getData,
  sendData
};
