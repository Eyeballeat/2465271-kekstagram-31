//  Создаем константы с переменными и массивами необходимых данных
export const AUTORS = ['Артем', 'Андрей', 'Сергей', 'Владимир', 'Дмитрий', 'Василий', 'Александр', 'Вячеслав', 'Антон', 'Евгений', 'Михаил', 'Денис', 'Мария', 'Татьяна', 'Елена', 'Анастасия', 'Виктория', 'Екатерина', 'Светлана', 'Юлия', 'Юрий', 'Валерия', 'Станислав', 'Ольга', 'Любовь'];
export const DESCRIPTIONS = ['Красота!', 'Вау!', 'Класс!', 'Обожаю!', 'Без комментариев', 'Лучше промолчать!', 'Комментарии здесь излишни!', 'Очень интересная фотография!'];
export const COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

export const templatePictureFragment = document.querySelector('#picture').content;
export const pictureContainer = document.querySelector('.pictures');

export const bigPicture = document.querySelector('.big-picture');
export const bigPictureImage = bigPicture.querySelector('.big-picture__img').firstElementChild;
export const likesCount = bigPicture.querySelector('.likes-count');
export const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
export const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
export const socialComment = bigPicture.querySelector('.social__comments');
export const socialCaption = bigPicture.querySelector('.social__caption');
export const loaderButton = bigPicture.querySelector('.social__comments-loader');
export const closerButton = bigPicture.querySelector('.big-picture__cancel');
export const MESSAGE_COUNT = 5;

export const formForUploadImage = document.querySelector('.img-upload__form');
export const uploadImageInput = formForUploadImage.querySelector('.img-upload__input');
export const uploadPrewiewInput = formForUploadImage.querySelector('.img-upload__preview');
export const uploadOverlay = formForUploadImage.querySelector('.img-upload__overlay');
export const textInHashTagInput = formForUploadImage.querySelector('.text__hashtags');
export const textInDescriptionInput = formForUploadImage.querySelector('.text__description');
export const imageScaleInput = formForUploadImage.querySelector('.scale__control');
export const buttonForCancel = formForUploadImage.querySelector('.img-upload__cancel');
export const imageFieldWrapper = formForUploadImage.querySelector('.img-upload__field-wrapper');
export const imageUploadButton = formForUploadImage.querySelector('.img-upload__submit');
