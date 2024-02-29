import { isEscape } from './util.js';
export const renderFullSizeImage = (fun) => {
  const bigPicture = document.querySelector('.big-picture');
  const imageSource = bigPicture.querySelector('.big-picture__img');
  const likeQuantity = bigPicture.querySelector('.likes-count');
  const commentQuantity = bigPicture.querySelector('.social__comment-shown-count');
  const totalCommentQuantity = bigPicture.querySelector('.social__comment-total-count');
  const commentBlock = bigPicture.querySelector('.social__comments');
  const photoDescription = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentLoadButton = bigPicture.querySelector('.comments-loader');
  const imageCanvas = document.querySelector('.pictures');
  const bigPictureWindowCloser = document.querySelector('#picture-cancel');
  const onDocumentKeydown = (event) => {
    if (isEscape(event)) {
      event.preventDefault();
      closerFunctionKit();
    }
  };
  function closerFunctionKit () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  imageCanvas.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      document.body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      commentCountBlock.classList.add('hidden');
      commentLoadButton.classList.add('hidden');
      imageSource.firstElementChild.src = evt.target.src;
      fun.forEach((el) => {
        if (el.url === evt.target.attributes.src.value) {
          likeQuantity.textContent = el.likes;
          commentQuantity.textContent = el.comments.length;
          totalCommentQuantity.textContent = el.comments.length;
          photoDescription.textContent = el.description;
          el.comments.forEach((data) => {
            const source = data.avatar;
            const name = data.name;
            const text = data.message;
            const list = document.createElement('li');
            const image = document.createElement('img');
            const paragraph = document.createElement('p');
            list.classList.add('social__comment');
            image.classList.add('social__picture');
            paragraph.classList.add('social__text');
            image.src = source;
            image.alt = name;
            paragraph.textContent = text;
            list.append(image);
            list.append(paragraph);
            commentBlock.append(list);
          });
        }
      });
      bigPictureWindowCloser.addEventListener('click', () => {
        closerFunctionKit();
      });
      document.addEventListener('keydown', onDocumentKeydown);
    }
  });
};
