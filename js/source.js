const MESSAGE_COUNT = 5;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const PICTURE_SCALE_STEP = 25;
const FULL_IMAGE_SIZE = 100;
const MAX_COMMENTS_LENGTH = 140;
const MIN_IMAGE_SIZE = 25;
const RERENDER_DELAY = 500;
const MAX_SHOWER_PHOTO = 10;
const ERROR_SHOW_TIME = 5000;

const fileTypes = ['jpg', 'jpeg', 'png', 'svg'];

const templatePictureFragmentElement = document.querySelector('#picture').content;
const pictureContainerElement = document.querySelector('.pictures');

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img').firstElementChild;
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const shownCommentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const loaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const closerButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const formForUploadImageElement = document.querySelector('.img-upload__form');
const uploadImageInputElement = formForUploadImageElement.querySelector('.img-upload__input');
const uploadPrewiewInputElement = formForUploadImageElement.querySelector('.img-upload__preview');
const uploadOverlayElement = formForUploadImageElement.querySelector('.img-upload__overlay');
const textInHashTagInputElement = formForUploadImageElement.querySelector('.text__hashtags');
const textInDescriptionInputElement = formForUploadImageElement.querySelector('.text__description');
const buttonForCancelElement = formForUploadImageElement.querySelector('.img-upload__cancel');
const imageUploadButtonElement = formForUploadImageElement.querySelector('.img-upload__submit');
const imageEffectLevelElement = formForUploadImageElement.querySelector('.img-upload__effect-level');
const effectPreviewElement = formForUploadImageElement.querySelectorAll('.effects__preview');

const scaleSmallerButtonElement = formForUploadImageElement.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = formForUploadImageElement.querySelector('.scale__control--bigger');
const scaleValueFieldElement = formForUploadImageElement.querySelector('.scale__control--value');
const imageScaleFormElement = formForUploadImageElement.querySelector('.img-upload__scale');

const effectLevelSliderElement = formForUploadImageElement.querySelector('.effect-level__slider');
const effectLevelValueElement = formForUploadImageElement.querySelector('.effect-level__value');
const nonEffectButtonElement = formForUploadImageElement.querySelector('#effect-none');
const effectListElement = formForUploadImageElement.querySelector('.effects__list');

const errorUploadTitleElement = document.querySelector('.error__title');
const successUploadTitleElement = document.querySelector('.success__title');
const errorTitleElement = document.querySelector('data-error__title');
const errorUploadButtonElement = document.querySelector('.error__button');
const successUploadButtonElement = document.querySelector('.success__button');
const ImageUploadButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const imageFiltersElement = document.querySelector('.img-filters');
const imageFilterFormElement = document.querySelector('.img-filters__form');

export {
  MESSAGE_COUNT,
  MIN_LIKES_COUNT,
  MAX_LIKES_COUNT,
  PICTURE_SCALE_STEP,
  FULL_IMAGE_SIZE,
  MAX_COMMENTS_LENGTH,
  MIN_IMAGE_SIZE,
  RERENDER_DELAY,
  ERROR_SHOW_TIME,
  MAX_SHOWER_PHOTO,
  fileTypes,
  templatePictureFragmentElement,
  pictureContainerElement,
  bigPictureElement,
  bigPictureImageElement,
  likesCountElement,
  shownCommentCountElement,
  commentTotalCountElement,
  socialCommentElement,
  socialCaptionElement,
  loaderButtonElement,
  closerButtonElement,
  formForUploadImageElement,
  uploadImageInputElement,
  uploadPrewiewInputElement,
  uploadOverlayElement,
  textInHashTagInputElement,
  textInDescriptionInputElement,
  buttonForCancelElement,
  imageUploadButtonElement,
  scaleSmallerButtonElement,
  scaleBiggerButtonElement,
  scaleValueFieldElement,
  imageScaleFormElement,
  imageEffectLevelElement,
  effectLevelSliderElement,
  effectLevelValueElement,
  nonEffectButtonElement,
  effectListElement,
  effectPreviewElement,
  errorUploadTitleElement,
  successUploadTitleElement,
  errorTitleElement,
  errorUploadButtonElement,
  successUploadButtonElement,
  ImageUploadButtonText,
  imageFiltersElement,
  imageFilterFormElement
};
