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
  const duration = durationMeeting * 60000;
  const start = new Date (`2024 ${startTime}`);
  const end = new Date (`2024 ${endTime}`);
  const meeting = new Date (`2024 ${startMeeting}`);
  return meeting >= start && end - meeting >= duration;
};
checkWorkingHours('08:00', '14:30', '14:5', 26);

