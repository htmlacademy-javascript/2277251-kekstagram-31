// Функция для проверки длины строки.
function getStringLength(string, maxLength) {
  return string.length <= maxLength;
}

getStringLength('проверяемая строка', 20); // true
getStringLength('проверяемая строка', 18); // true
getStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом.
function isPalindrome(string) {
  string = string.replaceAll(/\s/g,'').toLowerCase();
  return string === string.split('').reverse().join('');
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Дополнительное задание - Функция принимающая строку и возвращающая целое число.
function getNumber(string) {
  const number = parseInt(string.toString().replace(/[^\d]/g, ''), 10);
  return number;
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN

// Функция, которая проверяет, выходит ли встреча за рамки рабочего дня.
const MINUTES_IN_HOUR = 60;
const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':'); // Преобразуем строку времени в общее количество минут.
  return hours * MINUTES_IN_HOUR + +minutes;
};
const isMeetingOutsideWorkHours = (workDayStart, workDayEnd, meetingStart, meetingDurationInMinutes) => {
  const workDayStartInMinutes = convertTimeToMinutes(workDayStart); // Получаем время в минутах
  const workDayEndInMinutes = convertTimeToMinutes(workDayEnd);
  const meetingStartInMinutes = convertTimeToMinutes(meetingStart);
  const meetingEndInMinutes = meetingStartInMinutes + meetingDurationInMinutes; // Расчёт времени окончания встречи
  return meetingEndInMinutes <= workDayEndInMinutes && meetingStartInMinutes >= workDayStartInMinutes; // Проверка, в рабочее ли время встреча
};
/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
isMeetingOutsideWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingOutsideWorkHours('8:0', '10:0', '8:0', 120); // true
isMeetingOutsideWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingOutsideWorkHours('14:00', '17:30', '08:0', 90); // false
isMeetingOutsideWorkHours('8:00', '17:30', '08:00', 900); // false
