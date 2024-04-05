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

const createSocialCommentBlock = (comment) => {
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

const insertComments = (start, finish) => {
  getCommentsFromCurrentPost().slice(start, finish)
    .forEach((post) => {
      socialCommentElement.append(createSocialCommentBlock(post));
    });
};

const loadComments = () => {
  const currentCommentLength = getCommentsFromCurrentPost().length;
  const curentValueOfComments = state.currentComments;
  if (curentValueOfComments < currentCommentLength - MESSAGE_COUNT) {
    const incrisedNumberOfComments = state.currentComments += MESSAGE_COUNT;
    setCurrentCommentsData(incrisedNumberOfComments);
    loaderButtonElement.classList.remove('hidden');
  } else {
    const lastNumberOfComments = state.currentComments += currentCommentLength - state.currentComments;
    setCurrentCommentsData(lastNumberOfComments);
    loaderButtonElement.classList.add('hidden');
  }
  insertComments(curentValueOfComments, state.currentComments);
  shownCommentCountElement.textContent = state.currentComments;
};

const onLoadMoreCommentsClick = () => loadComments();

export const showUserPost = (post) => {
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
