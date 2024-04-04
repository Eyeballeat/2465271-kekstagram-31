import { getData } from './api.js';
import { changePictureEffect } from './overlay-effects.js';
import { validationOfForm } from './edit-of-user-form.js';
import { setPostsData } from './user-state.js';
import { getFilteredPictures, showPictureFilterElement, showImageFilter } from './image-filter.js';
import { showErrorMessage } from './error-popup.js';

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
