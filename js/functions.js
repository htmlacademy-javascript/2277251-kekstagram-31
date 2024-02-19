// Функция для проверки длины строки.
function getStringLength (string, maxLength) {
  return string.length <= maxLength;
}

getStringLength('проверяемая строка', 20); // true
getStringLength('проверяемая строка', 18); // true
getStringLength('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом.
function isPalindrome (string) {
  const normalizedString = string.replaceAll(/\s/g,'').toLowerCase();
  let reverseString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }
  return reverseString === normalizedString;
}

// 2 вариант функции с палиндромом.
/* function isPalindrome (string) {
  string = string.replaceAll(/\s/g,'').toLowerCase();
  return string === string.split('').reverse().join('');
} */

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

// Дополнительное задание - Функция принимающая строку и возвращающая целое число.
// 1 вариант.
const getNumber = (string) => {
  let number = '';
  string = string.toString();
  for (let i = 0; i < string.length; i++) {
    const currentChar = parseInt(string[i], 10);
    if (!Number.isNaN(currentChar)) {
      number += currentChar.toString();
    }
  }
  return parseInt(number, 10);
};

// 2 вариант.
/* function getNumber(string) {
  const number = parseInt(string.toString().replace(/[^\d]/g, ''), 10);
  return number;
} */

getNumber('2023 год'); // 2023
getNumber('ECMAScript 2022'); // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007'); // 7
getNumber('а я томат'); // NaN
