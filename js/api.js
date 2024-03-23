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
}
  from './source.js';
import {
  showAlertOfUpload,
  showAlertOfLoad,
  unblockSubmitButton,
}
  from './util.js';

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
