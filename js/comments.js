import { MAX_COMMENTS_COUNT } from './const.js';
import { getRandomNum, getRandomArrayElement } from './utils.js';
import { AUTHORS, COMMENT_ID} from './mock.js';

const commentsLength = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const showCommentsBtn = document.querySelector('.social__comments-loader');
const newTextComment = document.querySelector('.social__footer-text');
const addCommentBtn = document.querySelector('.social__footer-btn');
let currentComments = [];

// убираем кнопку если меньше 6 коментов при открытии карточки
const hiddenCommentsBtn = () => {
  if (currentComments.length === commentsList.children.length) {
    showCommentsBtn.classList.add('hidden');
    removeHandleShowCommentsMore();
  } else {
    showCommentsBtn.classList.remove('hidden');
  }
};

// счетчик коментов
const addCommentsCount = (number) => {
  const minCommentsLength = String(commentsList.children.length);
  const maxCommentsLength = String(number);
  commentsLength.textContent = `${minCommentsLength} из ${maxCommentsLength} комментариев`;
};

const showMoreComments = (comments) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const { avatar, message, name } = comments[i];
    const commentTemplate = commentItem.cloneNode(true);
    const avatarImage = commentTemplate.querySelector('.social__picture');
    avatarImage.src = avatar;
    avatarImage.alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    fragment.append(commentTemplate);
  }

  commentsList.append(fragment);

}; // отрисовка

export const addComments = (comments) => { // показ 5 комментов
  commentsList.innerHTML = '';
  currentComments = comments;

  showMoreComments(currentComments.slice(0, MAX_COMMENTS_COUNT));

  hiddenCommentsBtn();
  addCommentsCount(currentComments.length);
  showCommentsBtn.addEventListener('click', handleShowCommentsMore);
};


function handleShowCommentsMore() {
  const commentsToShow = currentComments.slice(commentsList.children.length, commentsList.children.length + MAX_COMMENTS_COUNT);
  showMoreComments(commentsToShow);
  hiddenCommentsBtn();
  addCommentsCount(currentComments.length); // обновляю счетчик
}

export function removeHandleShowCommentsMore () {
  showCommentsBtn.removeEventListener('click', handleShowCommentsMore);
}

function addNewComment() {
  const commentText = newTextComment.value;
  if (commentText) {
    const newComment = {
      id: COMMENT_ID(),
      avatar: `img/avatar-${getRandomNum(6, 1)}.svg`,
      message: commentText,
      name: getRandomArrayElement(AUTHORS),
    };
    pushComments(newComment);
    newTextComment.value = '';
    showMoreComments(currentComments);
    addComments(currentComments)
    addCommentsCount(currentComments.length);
  }
}

function pushComments(newComment) {
  currentComments.unshift(newComment);
  // console.log(currentComments);
}

addCommentBtn.addEventListener('click', addNewComment)


