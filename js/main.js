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

function getRandomMessage() { // функция для генерации текста комментария
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return messages[getRandomInteger(0, messages.length - 1)];
}

function generatePhoto () { // функция для генерации объекта с описанием фото
  return {
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: 'Описание фото',
    likes: getRandomInteger(15, 200),
    comments: generateComments()
  };
}

const NUM_PHOTOS_TO_GENERATE = 25; // количество фото для генерации.
const generatedPhotos = []; // массив для хранения сгенерированных фото.

for (let i = 0; i < NUM_PHOTOS_TO_GENERATE; i++) {
  generatedPhotos.push(generatePhoto()); // запись сгенерированных фото в массив similarPhotos.
}
