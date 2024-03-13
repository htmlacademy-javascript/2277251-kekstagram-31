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

const commentAuthors = ['Пётр', 'Иван', 'Илья', 'Анна', 'Алиса', 'Николай'];

const generateComments = () => { // функция для генерации комментариев
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
      message,
      name
    });
  }
  return comments;
};

const uniquePhotoIds = [];
const uniquePhotoUrls = [];

const generatePhoto = () => { // функция для генерации объекта с описанием фото
  let id;
  let url;
  do { // циклы для генерации уникальных id и url фото.
    id = getRandomInteger(1, 25);
  } while (
    uniquePhotoIds.includes(id) // если id фото уже есть в массиве uniquePhotoIds, то генерируем новый id до тех пор, пока он не будет уникальным.
  );
  uniquePhotoIds.push(id);
  do {
    url = `photos/${getRandomInteger(1, 25)}.jpg`;
  } while (
    uniquePhotoUrls.includes(url)
  );
  uniquePhotoUrls.push(url);
  return {
    id,
    url,
    description: 'Описание фото',
    likes: getRandomInteger(15, 200),
    comments: generateComments()
  };
};

const NUM_PHOTOS_TO_GENERATE = 25; // количество фото для генерации.
const createPhotos = () => Array.from({length: NUM_PHOTOS_TO_GENERATE}, generatePhoto);

export {createPhotos};
