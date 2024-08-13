import {photosData} from './mock.js';
import {handleOpenPopupClick} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture-template').content;

export const addImages = () => {
  const fragment = document.createDocumentFragment();

  photosData.forEach(({url, comments, likes, description, id}) => {
    const temp = pictureTemplate.cloneNode(true);
    temp.querySelector('.picture').id = id;
    temp.querySelector('.picture').addEventListener('click', handleOpenPopupClick); // удалить эту строку и переписать handleOpenPopupClick через делегирование событий
    temp.querySelector('.picture__img').src = url;
    temp.querySelector('.picture__img').alt = description;
    temp.querySelector('.picture__comments').textContent = String(comments.length);
    temp.querySelector('.picture__likes').textContent = String(likes);
    fragment.append(temp);
  });

  picturesContainer.append(fragment);
  // picturesContainer.addEventListener('click', handleOpenPopupClick) // коментировать
};
