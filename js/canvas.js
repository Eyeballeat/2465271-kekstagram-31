// Реализация функции вставляющей изображения с вложенными данными на страницу
export const insertImageElement = (dataArray) => {
  const templatePictureFragment = document.querySelector('#picture').content;
  const pictureContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  dataArray.forEach ((postElement) => {
    const template = templatePictureFragment.cloneNode(true);
    const image = template.querySelector('.picture__img');
    const comment = template.querySelector('.picture__comments');
    const like = template.querySelector('.picture__likes');
    image.src = postElement.url;
    image.alt = postElement.description;
    comment.innerText = postElement.comments.length;
    like.innerText = postElement.likes;
    fragment.append(template);
  });
  return pictureContainer.append(fragment);
};
