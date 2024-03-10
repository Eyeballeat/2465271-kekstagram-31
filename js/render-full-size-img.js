import {
  bigPicture,
  bigPictureImage,
  likesCount,
  shownCommentCount,
  commentTotalCount,
  socialComment,
  socialCaption,
  loaderButton,
  closerButton,
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
  if (evt.target === closerButton || evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialComment.innerHTML = '';
    clearStateData();
    document.removeEventListener('keydown', closeBigPicture);
  }
};

const downloadComments = (start, finish) => {
  getCommentsFromCurrentPost().slice(start, finish)
    .forEach((el) => {
      socialComment.append(socialCommentBlock(el));
    });
};

const loadMoreComments = () => {
  const currentCommentLength = getCommentsFromCurrentPost().length;
  const curentValueOfComments = state.currentComments;
  if (curentValueOfComments < currentCommentLength - MESSAGE_COUNT) {
    setCurrentCommentsData(state.currentComments += MESSAGE_COUNT);
    loaderButton.classList.remove('hidden');
  } else {
    setCurrentCommentsData(state.currentComments += currentCommentLength - state.currentComments);
    loaderButton.classList.add('hidden');
  }
  downloadComments(curentValueOfComments, state.currentComments);
  shownCommentCount.textContent = state.currentComments;
};

export const onClickOnPost = (post) => {
  const picture = getPostbyId(post);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialComment.innerHTML = '';
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentTotalCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;
  setCurrentPostData(post);
  getCommentsFromCurrentPost();
  setCurrentCommentsData(0);
  loadMoreComments();
  loaderButton.addEventListener('click', loadMoreComments);
  closerButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeBigPicture);
};
