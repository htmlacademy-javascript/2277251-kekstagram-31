// Функция для проверки длины строки.

function getStringLength (string, maxLength) {
  return string.length <= maxLength;
}

getStringLength('проверяемая строка', 20); // true
getStringLength('проверяемая строка', 18); // true
getStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом.

/* function isPalindrome (string) {
  const normalizedString = string.replaceAll(/\s/g,'').toLowerCase();
  let emptyString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {

  }
} */

function isPalindrome (string) {
  string = string.replaceAll(/\s/g,'').toLowerCase();

  return string === string.split('').reverse().join('');
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Дополнительное задание

function getNumber(string) {
  let number = parseInt(string.replace(/[^\d]/g, ''));
  return number;
}

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
