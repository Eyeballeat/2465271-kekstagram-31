import {
  definitionHashtag
}
  from './form.js';
import {
  MAX_COMMENTS_LENGTH,
  MESSAGE_COUNT,
  // successUploadButtonElement,
  imageUploadButton,
  imageUploadButtonText
}
  from './source.js';

// Создаем функцию возвращающую рандомное число
const getRandomData = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// Создаем функцию возвращающую не повторяющиеся случайные значения ключей объектов
const createNoRepeatData = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomData(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomData(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
// Создаем функциювозвращающую случайный эемент массива
const getRandomArrayElement = (elements) => elements[getRandomData(0, elements.length - 1)];
// Создаем функцию для для вывода блока комментариев
const socialCommentBlock = (comment) => {
  const list = document.createElement('li');
  const image = document.createElement('img');
  const paragraph = document.createElement('p');
  list.classList.add('social__comment');
  image.classList.add('social__picture');
  paragraph.classList.add('social__text');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.style.width = 35;
  image.style.height = 35;
  paragraph.textContent = comment.message;
  list.append(image);
  list.append(paragraph);
  return list;
};
// Создаем функции для валидации данных введенных в поля комментариев
const createRegular = (element) => /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(element);
const checkCommentOnLength = (string) => string.value.length <= MAX_COMMENTS_LENGTH;
const checkHashtagOnCorrect = (hashtag) => definitionHashtag().every((elem) => hashtag.value.length === 0 || createRegular(elem));
const checkHashtagOnRepeat = () => new Set(definitionHashtag()).size === definitionHashtag().length;
const checkHashtagStringLength = () => definitionHashtag().length <= MESSAGE_COUNT;

// Показ сообщения об успешной загрузке

const closeAlertOfUpload = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  } if (evt.target === document.body.lastElementChild.lastElementChild) {
    return;
  }
  document.body.lastElementChild.remove();
  document.body.removeEventListener('click', closeAlertOfUpload);
  document.body.removeEventListener('keydown', closeAlertOfUpload);
};

const showAlertOfUpload = (data) => {
  const template = data.cloneNode(true);
  document.body.append(template);
  document.body.addEventListener('click', closeAlertOfUpload);
  document.body.addEventListener('keydown', closeAlertOfUpload);
};

const closeAlertOfLoad = () => {
  document.body.lastElementChild.remove();
};

const showAlertOfLoad = (data) => {
  const template = data.cloneNode(true);
  document.body.append(template);
  setTimeout(closeAlertOfLoad, 5000);
};

const blockSubmitButton = () => {
  imageUploadButton.disabled = true;
  imageUploadButton.textContent = imageUploadButtonText.SENDING;
};

const unblockSubmitButton = () => {
  imageUploadButton.disabled = false;
  imageUploadButton.textContent = imageUploadButtonText.IDLE;
};

export {
  getRandomData,
  createNoRepeatData,
  getRandomArrayElement,
  socialCommentBlock,
  checkHashtagStringLength,
  checkHashtagOnCorrect,
  checkHashtagOnRepeat,
  checkCommentOnLength,
  showAlertOfUpload,
  closeAlertOfUpload,
  showAlertOfLoad,
  blockSubmitButton,
  unblockSubmitButton
};
