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
  from './state.js';
import { socialCommentBlock } from './util.js';

const closeBigPicture = (evt) => {
  if (evt.target === closerButtonElement || evt.key === 'Escape') {
    evt.preventDefault();
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialCommentElement.innerHTML = '';
    clearStateData();
    document.removeEventListener('keydown', closeBigPicture);
  }
};

const downloadComments = (start, finish) => {
  getCommentsFromCurrentPost().slice(start, finish)
    .forEach((el) => {
      socialCommentElement.append(socialCommentBlock(el));
    });
};

const loadMoreComments = () => {
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

export const onClickOnPost = (post) => {
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
  loadMoreComments();
  loaderButtonElement.addEventListener('click', loadMoreComments);
  closerButtonElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPicture);
};
