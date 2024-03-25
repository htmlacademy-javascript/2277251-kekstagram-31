import {getRandomInteger} from './util.js';

const getRandomMessage = () => { // Функция для генерации текста комментария
  const MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
};

const getRandomDescription = () => { // Функция для генерации текста описаний фотографий
  const DESCRIPTIONS = [
    'Красивая бухта',
    'На пляже',
    'В парке',
    'С друзьями',
    'Поход',
    'Место отдыха',
    'Вечеринка в честь дня рождения',
    'Планы на выходные',
    'На завтраке',
    'Ночное небо'
  ];
  return DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
};

const COMMENT_AUTHORS = ['Пётр', 'Иван', 'Илья', 'Анна', 'Алиса', 'Николай'];

const generateComments = () => { // Функция для генерации комментариев
  const numComments = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < numComments; i++) { // Цикл для генерации комментариев и записи их в массив comments
    const id = i;
    const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const name = COMMENT_AUTHORS[getRandomInteger(0, COMMENT_AUTHORS.length - 1)];
    const message = getRandomMessage();
    comments.push({ // Запись комментариев в массив comments
      id,
      avatar,
      message,
      name
    });
  }
  return comments;
};

const NUM_PHOTOS_TO_GENERATE = 25; // Количество фото для генерации
const uniquePhotoIds = [];
const uniquePhotoUrls = [];

const generatePhoto = () => {
  let id;
  do { // Id обновляется на каждой итерации, в конечном итоге он будет уникальным и выйдет из цикла
    id = Math.floor(Math.random() * NUM_PHOTOS_TO_GENERATE) + 1; // Генерируем случайный id от 1 до максимального значения
  } while (
    uniquePhotoIds.includes(id)
  );
  const url = `photos/${id}.jpg`;
  uniquePhotoIds.push(id);
  uniquePhotoUrls.push(url);
  return {
    id,
    url,
    description: getRandomDescription(),
    likes: getRandomInteger(15, 200),
    comments: generateComments()
  };
};

const createPhotos = () => Array.from({length: NUM_PHOTOS_TO_GENERATE}, generatePhoto);

export {createPhotos};
