// Функция для проверки длины строки.

function getStringLength (string, maxLength) {
  return string.length <= maxLength;
}

// Строка короче 20 символов
getStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
getStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
getStringLength('проверяемая строка', 10); // false
