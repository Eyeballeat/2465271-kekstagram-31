import {
  FILE_TYPES,
  uploadImageInputElement,
  uploadPrewiewInputElement
}
  from './source.js';

export const loadUserImage = () => {
  const file = uploadImageInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    uploadPrewiewInputElement.querySelector('img').src = URL.createObjectURL(file);
  }
};
