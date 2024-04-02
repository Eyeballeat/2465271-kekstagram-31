import { getData } from './api.js';
import { changePictureEffect } from './image-effect-redactor.js';
import { validationOfForm } from './user-form-redactor.js';
import { setPostsData } from './user-state.js';
import { getFilteredPictures, showPictureFilterElement, showImageFilter } from './input-image-filter.js';
import { showErrorMessage } from './error-popup-window.js';

getData()
  .then((pictures) => {
    setPostsData(pictures);
    getFilteredPictures(pictures);
    showImageFilter();
  })
  .catch((err) => {
    showErrorMessage(err.Text);
  });
changePictureEffect();
validationOfForm();
showPictureFilterElement();
