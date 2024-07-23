import { AUTHORS, COMMENTS, DISCRIPION } from './const.js';
import { generateId, getRandomArrayElement, getRandomNum, } from './utils.js';

const MAX_OBJECT_LENGTH = 25;
const MAX_COMMENTS_LENGTH = 30;
const OBJ_ID = generateId();
const COMMENT_ID = generateId();

function createComment() {
  return {
    id: COMMENT_ID(),
    avatar: getRandomNum(6, 1),
    comment: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(AUTHORS),
  }
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




