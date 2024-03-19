//  Создаем константы с переменными и массивами необходимых данных
const AUTORS = ['Артем', 'Андрей', 'Сергей', 'Владимир', 'Дмитрий', 'Василий', 'Александр', 'Вячеслав', 'Антон', 'Евгений', 'Михаил', 'Денис', 'Мария', 'Татьяна', 'Елена', 'Анастасия', 'Виктория', 'Екатерина', 'Светлана', 'Юлия', 'Юрий', 'Валерия', 'Станислав', 'Ольга', 'Любовь'];
const DESCRIPTIONS = ['Красота!', 'Вау!', 'Класс!', 'Обожаю!', 'Без комментариев', 'Лучше промолчать!', 'Комментарии здесь излишни!', 'Очень интересная фотография!'];
const COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const MESSAGE_COUNT = 5;
const PICTURE_SCALE_STEP = 25;
const FULL_IMAGE_SIZE = 100;
const MAX_COMMENTS_LENGTH = 140;
const MIN_IMAGE_SIZE = 25;

const templatePictureFragment = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').firstElementChild;
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComment = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const loaderButton = bigPicture.querySelector('.social__comments-loader');
const closerButton = bigPicture.querySelector('.big-picture__cancel');

const formForUploadImage = document.querySelector('.img-upload__form');
const uploadImageInput = formForUploadImage.querySelector('.img-upload__input');
const uploadPrewiewInput = formForUploadImage.querySelector('.img-upload__preview');
const uploadOverlay = formForUploadImage.querySelector('.img-upload__overlay');
const textInHashTagInput = formForUploadImage.querySelector('.text__hashtags');
const textInDescriptionInput = formForUploadImage.querySelector('.text__description');
const imageScaleInput = formForUploadImage.querySelector('.scale__control');
const buttonForCancel = formForUploadImage.querySelector('.img-upload__cancel');
const imageFieldWrapper = formForUploadImage.querySelector('.img-upload__field-wrapper');
const imageUploadButton = formForUploadImage.querySelector('.img-upload__submit');

const scaleSmallerButton = formForUploadImage.querySelector('.scale__control--smaller');
const scaleBiggerButton = formForUploadImage.querySelector('.scale__control--bigger');
const scaleValueField = formForUploadImage.querySelector('.scale__control--value');
const effectValueField = formForUploadImage.querySelector('.effect-level__value');
const imageScaleForm = formForUploadImage.querySelector('.img-upload__scale');

const effectLevelSlider = formForUploadImage.querySelector('.effect-level__slider');
const effectLevelValue = formForUploadImage.querySelector('.effect-level__value');
const effectRadioButton = formForUploadImage.querySelectorAll('.effects__radio');
const NonEffectButton = formForUploadImage.querySelector('#effect-none');
const effectList = formForUploadImage.querySelector('.effects__list');
const effects = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    style: function (value) {
      return `grayscale(${value})`;
    }
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    style: function (value) {
      return `sepia(${value})`;
    }
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    style: function (value) {
      return `invert(${value}%)`;
    }
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    style: function (value) {
      return `blur(${value}px)`;
    }
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    style: function (value) {
      return `brightness(${value})`;
    }
  },
  none: {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 0,
    connect: 'lower',
    style: function () {
      return 'none';
    }
  }
};

const errorUploadMessageElement = document.querySelector('#error').content;
const successUploadMessageElement = document.querySelector('#success').content;
const errorUploadUserImageElement = document.querySelector('#data-error').content;
const errorUploadButtonElement = document.querySelector('.error__button');
const successUploadButtonElement = document.querySelector('.success__button');
const imageUploadButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

export {
  AUTORS,
  DESCRIPTIONS,
  COMMENT_MESSAGES,
  MESSAGE_COUNT,
  PICTURE_SCALE_STEP,
  FULL_IMAGE_SIZE,
  MAX_COMMENTS_LENGTH,
  MIN_IMAGE_SIZE,
  templatePictureFragment,
  pictureContainer,
  bigPicture,
  bigPictureImage,
  likesCount,
  shownCommentCount,
  commentTotalCount,
  socialComment,
  socialCaption,
  loaderButton,
  closerButton,
  formForUploadImage,
  uploadImageInput,
  uploadPrewiewInput,
  uploadOverlay,
  textInHashTagInput,
  textInDescriptionInput,
  imageScaleInput,
  buttonForCancel,
  imageFieldWrapper,
  imageUploadButton,
  scaleSmallerButton,
  scaleBiggerButton,
  scaleValueField,
  effectValueField,
  imageScaleForm,
  effectLevelSlider,
  effectLevelValue,
  effectRadioButton,
  NonEffectButton,
  effectList,
  effects,
  errorUploadMessageElement,
  successUploadMessageElement,
  errorUploadUserImageElement,
  errorUploadButtonElement,
  successUploadButtonElement,
  imageUploadButtonText
};
