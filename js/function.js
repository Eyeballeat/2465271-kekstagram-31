const checkStringLength = (string, length) => string.length < length;
checkStringLength('проверяемая строка', 10);

const getPalindrom = (string) => {
  const result = string.toLowerCase().replace(/[\s.,%]/g, '');
  return result === result.split('').reverse().join('');
};
getPalindrom('Лёша на полке клопа нашёл');

const numberExtraction = (data) => parseInt(data.toString().replace(/[^\d]/g, ''), 10);
numberExtraction(2023);

const checkWorkingHours = (startTime, endTime, startMeeting, durationMeeting) => {
  const a = new Date (`May 20, 2022 ${startTime}`);
  const b = new Date (`May 20, 2022 ${endTime}`);
  const c = new Date (`May 20, 2022 ${startMeeting}`);
  return b - a + c * durationMeeting;

};
// console.log(checkStringLength('08:0', '14,30', '10:00', 120));

