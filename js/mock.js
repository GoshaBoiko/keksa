import { generateId, getRandomArrayElement, getRandomNum, } from './utils.js';

export const AUTHORS = [
  'Igor', 'Vitalya', 'Vasya', 'Dima', 'Habib', 'Timon', 'Gena',
  'Roma', 'Rosa', 'Nastay', 'Olga', 'Helga', 'Lana', 'Alexey',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const DISCRIPION = [
  'Я на пляже',
  'Моя кошка',
  'Моя собака',
  'Мой день рождения',
  'Самый счастливый день в жизни',
];

const MAX_OBJECT_LENGTH = 25;
const MAX_COMMENTS_LENGTH = 30;
const OBJ_ID = generateId();
export const COMMENT_ID = generateId();

function createComment() {
  return {
    id: COMMENT_ID(),
    avatar: `img/avatar-${getRandomNum(6, 1)}.svg`,
    comment: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(AUTHORS),
  };
}

function createObj() {
  const id = OBJ_ID();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DISCRIPION),
    likes: getRandomNum(200, 15),
    comments: Array.from({length: getRandomNum(MAX_COMMENTS_LENGTH)}, createComment),
  };
}

export const photosData = Array.from({ length: MAX_OBJECT_LENGTH }, createObj);

