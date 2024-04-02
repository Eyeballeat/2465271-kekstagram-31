import {
  FILE_TYPES,
  uploadImageInputElement,
  uploadPrewiewInputElement,
  effectPreviewElement
}
  from './source.js';
// Создаем функцию загрузки изображений пользователя на страницу одновременно со вставкой в превью эффектов
export const onUserImageChange = () => {
  const file = uploadImageInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if(matches) {
    const blobElement = URL.createObjectURL(file);
    uploadPrewiewInputElement.querySelector('img').src = blobElement;
    effectPreviewElement.forEach((elem) => {
      elem.style.backgroundImage = `url(${blobElement})`;
    });
  }
};
