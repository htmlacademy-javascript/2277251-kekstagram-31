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
