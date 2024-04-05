import { pictureContainerElement,
  templatePictureFragmentElement
}
  from './source.js';
import { showUserPost } from './render-full-size-image.js';

export const insertImageElement = (data) => {
  data.forEach ((postElement) => {
    const template = templatePictureFragmentElement.cloneNode(true);
    const link = template.querySelector('a');
    const image = template.querySelector('.picture__img');
    const comment = template.querySelector('.picture__comments');
    const like = template.querySelector('.picture__likes');
    image.src = postElement.url;
    image.alt = postElement.description;
    image.id = postElement.id;
    comment.innerText = postElement.comments.length;
    like.innerText = postElement.likes;
    pictureContainerElement.append(template);
    link.addEventListener('click', () => {
      showUserPost(postElement.id);
    });
  });
};
