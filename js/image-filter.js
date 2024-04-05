import { getData } from './api.js';
import {
  imageFilterFormElement,
  pictureContainerElement,
  imageFiltersElement,
  RERENDER_DELAY,
  MAX_SHOWER_PHOTO
}
  from './source.js';
import { removeDebounce } from './utils.js';
import { showErrorMessage } from './error-popup.js';
import { setPostsData } from './user-state.js';
import { insertImageElement } from './render-thumbnails.js';

const sortByComments = (a,b) => b.comments.length - a.comments.length;

const sortByRandomId = () => 0.5 - Math.random();

const clearPicturesContainer = () => {
  pictureContainerElement.querySelectorAll('.picture').forEach((elem) => {
    elem.remove();
  });
};

const getFilteredPictures = (data) => {
  clearPicturesContainer();
  const СurrentPictureFilters = {
    'filter-default': data,
    'filter-random': data.slice().sort(sortByRandomId).slice(0,MAX_SHOWER_PHOTO),
    'filter-discussed': data.slice().sort(sortByComments),
    applySelectedFilter() {
      imageFilterFormElement.querySelectorAll('.img-filters__button').forEach((elem) => {
        if (elem.classList.contains('img-filters__button--active')) {
          insertImageElement (this[elem.id]);
        }
      });
    }
  };
  СurrentPictureFilters.applySelectedFilter();
};

const showImageFilter = () => {
  imageFiltersElement.classList.remove('img-filters--inactive');
};

const changeActiveFilterElement = (evt) => {
  imageFilterFormElement.querySelectorAll('.img-filters__button')
    .forEach((filter) => filter.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const showFilterElements = (cb) => {
  imageFilterFormElement.addEventListener('click', (evt) => {
    changeActiveFilterElement(evt);
    cb();
  });
};

const showSortPictures = () => {
  getData()
    .then((pictures) => {
      setPostsData(pictures);
      getFilteredPictures(pictures);
    })
    .catch((err) => {
      showErrorMessage(err.Text);
    });
};

const showPictureFilterElement = () => {
  showFilterElements(removeDebounce(() => showSortPictures(), RERENDER_DELAY));
};

export {
  showPictureFilterElement,
  showImageFilter,
  getFilteredPictures
};
