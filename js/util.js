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
