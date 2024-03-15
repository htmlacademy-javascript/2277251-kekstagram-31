import {getRandomInteger} from './util.js';

const getRandomMessage = () => { // функция для генерации текста комментария
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return messages[getRandomInteger(0, messages.length - 1)];
};

const getRandomDescription = () => { // функция для генерации текста описаний фотографий
  const descriptions = [
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
  return descriptions[getRandomInteger(0, descriptions.length - 1)];
};

const commentAuthors = ['Пётр', 'Иван', 'Илья', 'Анна', 'Алиса', 'Николай'];

const generateComments = () => { // функция для генерации комментариев
  const numComments = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < numComments; i++) { // цикл для генерации комментариев и записи их в массив comments.
    const id = i;
    const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const name = commentAuthors[getRandomInteger(0, commentAuthors.length - 1)];
    const message = getRandomMessage();
    comments.push({ // запись комментариев в массив comments.
      id,
      avatar,
      message,
      name
    });
  }
  return comments;
};

const NUM_PHOTOS_TO_GENERATE = 25; // количество фото для генерации.
const uniquePhotoIds = [];
const uniquePhotoUrls = [];

const generatePhoto = () => {
  let id;
  do { // id обновляется на каждой итерации, в конечном итоге он будет уникальным и выйдет из цикла
    id = Math.floor(Math.random() * NUM_PHOTOS_TO_GENERATE) + 1; // генерируем случайный id от 1 до максимального значения
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
