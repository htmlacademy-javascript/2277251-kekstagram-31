const getRandomInteger = (a, b) => { // Функция для генерации случайного числа от min до max
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const isEscapeKey = (event) => event.key === 'Escape'; // Функция для проверки, нажата ли клавиша Escape

export {getRandomInteger, isEscapeKey};
