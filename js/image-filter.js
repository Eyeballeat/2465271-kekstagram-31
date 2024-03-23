import { getData } from './api.js';

import { imageFilterFormElement,
  pictureContainer,
  RERENDER_DELAY
}
  from './source.js';

import { showImageFilter,
  createNoRepeatData,
  debounce
}
  from './util.js';

const sortByComments = (a,b) => {
  const elementA = +a.comments.length;
  const elementB = +b.comments.length;
  return elementB - elementA;
};


const sortByRandomId = () => {
  const randomData = createNoRepeatData(0, 24);
  const elementA = randomData();
  const elementB = randomData();
  return elementA - elementB;
};

const clearPicturesContainer = () => {
  pictureContainer.querySelectorAll('.picture').forEach((elem) => {
    elem.remove();
  });
};

const sortElement = (evt) => {
  if (evt.target === imageFilterFormElement.querySelector('#filter-random')) {
    clearPicturesContainer();
    getData(sortByRandomId, 15);
  } if (evt.target === imageFilterFormElement.querySelector('#filter-discussed')) {
    clearPicturesContainer();
    getData(sortByComments);
  } if (evt.target === imageFilterFormElement.querySelector('#filter-default')) {
    clearPicturesContainer();
    getData();
  }
};

const setDelay = (debounce(sortElement, RERENDER_DELAY));

const showPictureFilterElement = () => {
  document.addEventListener('load', showImageFilter());
  document.addEventListener('click', setDelay);
};

export {
  showPictureFilterElement,
};
