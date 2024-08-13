import { MAX_COMMENTS_COUNT } from './const.js';

const commentsLength = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');
const showCommentsBtn = document.querySelector('.social__comments-loader');
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
    const { avatar, comment, name } = comments[i];
    const commentTemplate = commentItem.cloneNode(true);
    const avatarImage = commentTemplate.querySelector('.social__picture');
    avatarImage.src = avatar;
    avatarImage.alt = name;
    commentTemplate.querySelector('.social__text').textContent = comment;
    fragment.append(commentTemplate);
  }

  commentsList.append(fragment);
}; // отрисовка

export const addComments = (comments) => { // показ 5 коментов
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
