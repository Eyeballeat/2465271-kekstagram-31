// Создаем функцию возвращающую рандомное число
export const getRandomData = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// Создаем функцию возвращающую не повторяющиеся случайные значения ключей объектов
export function createNoRepeatData (min, max) {
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
}
// Создаем функциювозвращающую случайный эемент массива
export const getRandomArrayElement = (elements) => elements[getRandomData(0, elements.length - 1)];
// Создаем функцию реакции нажатия клавиши Escape
export const isEscape = (event) => event.key === 'Escape';
// Создаем функцию заполнения элемента комментами
export const getCommentsList = (element, count, object) => {
  object.innerHTML = '';
  element.forEach((data, index) => {
    if (index < count) {
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
      object.append(list);
    }
  });
};

export const addEnoughComments = (count, data) => {
  if (count < (data - 5)) {
    count += 5;
  } else {
    count += (data - count);
  } return count;
};
