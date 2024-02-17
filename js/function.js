const checkStringLength = (string, length) => string.length < length;
checkStringLength('проверяемая строка', 10);

const getPalindrom = (string) => {
  const result = string.toLowerCase().replace(/[\s.,%]/g, '');
  return result === result.split('').reverse().join('');
};
getPalindrom('Лёша на полке клопа нашёл');

const numberExtraction = (data) => parseInt(data.toString().replace(/[^\d]/g, ''), 10);
numberExtraction(2023);
