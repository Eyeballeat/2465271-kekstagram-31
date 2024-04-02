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
// Создаем функцию возвращающую случайный эемент массива
const getRandomArrayElement = (elements) => elements[getRandomData(0, elements.length - 1)];
// Функция инициализации нажатия клавиши Escape
const isEscapeButton = (evt) => evt.key === 'Escape';
// Функция инициализации темплейтов
const getTemplateElement = (templateId, selector) => {
  const template = document.querySelector(templateId).content;
  return (selector ? template.querySelector(selector) : template).cloneNode(
    true
  );
};
// Устранение дребезга при перезагрузки изображений при выборе фильтрации
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomData,
  createNoRepeatData,
  getRandomArrayElement,
  isEscapeButton,
  getTemplateElement,
  debounce,
};
