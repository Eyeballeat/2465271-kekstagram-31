import { getData } from './api.js';
import {
  imageFilterFormElement,
  pictureContainerElement,
  imageFiltersElement,
  RERENDER_DELAY,
  MAX_SHOWER_PHOTO
}
  from './source.js';
import { debounce } from './util.js';
import { showErrorMessage } from './error-popup-window.js';
import { setPostsData } from './user-state.js';
import { insertImageElement } from './input-image-renderer.js';
// Создаем функцию для сортировки фотографий по количеству комментариев
const sortByComments = (a,b) => +b.comments.length - +a.comments.length;
// Создаем функцию для сортировки фотографий в рандомном порядке.
// При вычитании из 0.5 будет получаться значение или больше или меньше 0
const sortByRandomId = () => 0.5 - Math.random();
// Создаем функцию для очистки контейнера с фотографиями
const clearPicturesContainer = () => {
  pictureContainerElement.querySelectorAll('.picture').forEach((elem) => {
    elem.remove();
  });
};
// Создаем функцию для обработки фотографий для последующего рендеринга
const getFilteredPictures = (data) => {
  clearPicturesContainer();
  const СurrentPictureFilters = {
    'filter-default': data,
    'filter-random': data.slice().sort(sortByRandomId).slice(0,MAX_SHOWER_PHOTO),
    'filter-discussed': data.slice().sort(sortByComments),
    active: function () {
      imageFilterFormElement.querySelectorAll('.img-filters__button').forEach((elem) => {
        if (elem.classList.contains('img-filters__button--active')) {
          insertImageElement (this[elem.id]);
        }
      });
    }
  };
  СurrentPictureFilters.active();
};
// Создаем функцию для показа меню выбора фильтров
const showImageFilter = () => {
  imageFiltersElement.classList.remove('img-filters--inactive');
};
// Создаем колбэк для смены фильтров по клику
const onActiveElementChange = (evt) => {
  imageFilterFormElement.querySelectorAll('.img-filters__button')
    .forEach((filter) => filter.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};
// Создаем функцию для смены фильтров
const showFilterElements = (cb) => {
  imageFilterFormElement.addEventListener('click', (evt) => {
    onActiveElementChange(evt);
    cb();
  });
};
// Объявляем колбэк для загрузки изображений с сервера и их обработки перед рендерингом
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
// Создаем функцию прорисовки изображений с устранением дребезга методом debounce
const showPictureFilterElement = () => {
  showFilterElements(debounce(() => showSortPictures(), RERENDER_DELAY));
};

export {
  showPictureFilterElement,
  showImageFilter,
  getFilteredPictures
};
