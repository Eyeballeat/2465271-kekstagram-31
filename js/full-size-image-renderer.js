import {
  bigPictureElement,
  bigPictureImageElement,
  likesCountElement,
  shownCommentCountElement,
  commentTotalCountElement,
  socialCommentElement,
  socialCaptionElement,
  loaderButtonElement,
  closerButtonElement,
  MESSAGE_COUNT,
}
  from './source.js';
import {
  state,
  setCurrentPostData,
  setCurrentCommentsData,
  getPostbyId,
  getCommentsFromCurrentPost,
  clearStateData
}
  from './user-state.js';
// Создаем функцию закрытия показа окна полноэкранного просмотра изображения
const onCloseBigPicture = (evt) => {
  if (evt.target === closerButtonElement || evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialCommentElement.innerHTML = '';
    clearStateData();
    document.removeEventListener('keydown', onCloseBigPicture);
  }
};
// Создаем функцию инициализации блока изображения с комментариями
const socialCommentBlock = (comment) => {
  const list = document.createElement('li');
  const image = document.createElement('img');
  const paragraph = document.createElement('p');
  list.classList.add('social__comment');
  image.classList.add('social__picture');
  paragraph.classList.add('social__text');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.style.width = 35;
  image.style.height = 35;
  paragraph.textContent = comment.message;
  list.append(image);
  list.append(paragraph);
  return list;
};
// Создаем функцию загрузки блока комментариев
const downloadComments = (start, finish) => {
  getCommentsFromCurrentPost().slice(start, finish)
    .forEach((el) => {
      socialCommentElement.append(socialCommentBlock(el));
    });
};
// Создаем функцию загрузки порции комментариев
const loadComments = () => {
  const currentCommentLength = getCommentsFromCurrentPost().length;
  const curentValueOfComments = state.currentComments;
  if (curentValueOfComments < currentCommentLength - MESSAGE_COUNT) {
    setCurrentCommentsData(state.currentComments += MESSAGE_COUNT);
    loaderButtonElement.classList.remove('hidden');
  } else {
    setCurrentCommentsData(state.currentComments += currentCommentLength - state.currentComments);
    loaderButtonElement.classList.add('hidden');
  }
  downloadComments(curentValueOfComments, state.currentComments);
  shownCommentCountElement.textContent = state.currentComments;
};
// Создаем колбэк загрузки дополнительных комментариев по клику
const onLoadMoreCommentsClick = () => loadComments();
// Создаем колбэк инициализации поста
export const onPostClick = (post) => {
  const picture = getPostbyId(post);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentElement.innerHTML = '';
  bigPictureImageElement.src = picture.url;
  likesCountElement.textContent = picture.likes;
  commentTotalCountElement.textContent = picture.comments.length;
  socialCaptionElement.textContent = picture.description;
  setCurrentPostData(post);
  getCommentsFromCurrentPost();
  setCurrentCommentsData(0);
  loadComments();
  loaderButtonElement.addEventListener('click', onLoadMoreCommentsClick);
  closerButtonElement.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onCloseBigPicture);
};
