import { setPostsData } from './state.js';
import { insertImageElement } from './canvas.js';
import { validationOfForm, closePictureHandlerWindow } from './form.js';
import { errorUploadMessageElement, successUploadMessageElement, errorUploadUserImageElement } from './source.js';
import { showAlertOfUpload, showAlertOfLoad, unblockSubmitButton } from './util.js';

const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      setPostsData(data);
      insertImageElement();
      validationOfForm();
    }).catch (() => showAlertOfLoad(errorUploadUserImageElement));
};

const sendData = (evt) => {
  const formData = new FormData(evt.target);
  fetch('https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      showAlertOfUpload(successUploadMessageElement);
      closePictureHandlerWindow(evt);
    }
  }). catch (() => showAlertOfUpload(errorUploadMessageElement))
    .finally(unblockSubmitButton);
};

export {
  getData,
  sendData
};
