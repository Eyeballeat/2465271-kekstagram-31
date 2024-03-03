import { getCommentsList } from './util.js';
import { addEnoughComments } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const imageSource = bigPicture.querySelector('.big-picture__img');
const likeQuantity = bigPicture.querySelector('.likes-count');
const commentQuantity = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentQuantity = bigPicture.querySelector('.social__comment-total-count');
const commentBlock = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const commentLoadButton = bigPicture.querySelector('.comments-loader');
const imageCanvas = document.querySelector('.pictures');
const closerButton = document.querySelector('#picture-cancel');

export const renderFullSizeImage = (resultArray) => {
  const closeBigPicture = (evt) => {
    if (evt.target === closerButton || evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentBlock.innerHTML = '';
      commentQuantity.textContent = '';
      totalCommentQuantity.textContent = '';
      document.removeEventListener('keydown', closeBigPicture);
    }
  };
  const getCommentBlock = (evt) => {
    let generatedCount;
    if (evt.target.classList.contains('picture__img')) {
      generatedCount = '';
      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      imageSource.firstElementChild.src = evt.target.src;
      imageSource.firstElementChild.alt = evt.target.alt;
      resultArray.forEach((element) => {
        if (element.url === evt.target.attributes.src.value) {
          likeQuantity.textContent = element.likes;
          totalCommentQuantity.textContent = element.comments.length;
          photoDescription.textContent = element.description;
          commentBlock.innerHTML = '';
          if (element.comments.length < 5) {
            generatedCount = element.comments.length;
          } else {
            generatedCount = 5;
          }
          commentQuantity.textContent = generatedCount;
          getCommentsList(element.comments, generatedCount, commentBlock);
          commentLoadButton.addEventListener('click', () => {
            generatedCount = addEnoughComments(generatedCount, element.comments.length);
            getCommentsList(element.comments, generatedCount, commentBlock);
            commentQuantity.textContent = generatedCount;
          });
        }
      });
      closerButton.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', closeBigPicture);
    }
  };
  imageCanvas.addEventListener('click', getCommentBlock);
};
