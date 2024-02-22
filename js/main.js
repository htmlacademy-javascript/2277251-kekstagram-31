const getRandomInteger = (a, b) => { // функция для генерации случайного числа от min до max.
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const commentAuthors = ['Пётр', 'Иван', 'Илья', 'Анна', 'Алиса', 'Николай'];

function generateComments() { // функция для генерации комментариев
  const numComments = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < numComments; i++) { // цикл для генерации комментариев и записи их в массив comments.
    const id = i;
    const avatar = `img/avatar-${getRandomInteger(1,6)}.svg`;
    const name = commentAuthors[getRandomInteger(0, commentAuthors.length - 1)];
    const message = getRandomMessage();
    comments.push({ // запись комментариев в массив comments.
      id,
      avatar,
      name,
      message
    });
  }
  return comments;
}
