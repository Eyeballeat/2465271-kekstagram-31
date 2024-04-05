import {
  fileTypes,
  uploadImageInputElement,
  uploadPrewiewInputElement,
  effectPreviewElement
}
  from './source.js';

export const loadUserLocalImage = () => {
  const file = uploadImageInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = fileTypes.some((type) => fileName.endsWith(type));
  if(matches) {
    const blobElement = URL.createObjectURL(file);
    uploadPrewiewInputElement.querySelector('img').src = blobElement;
    effectPreviewElement.forEach((image) => {
      image.style.backgroundImage = `url(${blobElement})`;
    });
  }
};
