import {handleOpenPopupClick} from './big-picture.js';
import {arrSorted, getRandomElementsNum} from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture-template').content;

export const addImages = (photosData, filterType) => {
  const fragment = document.createDocumentFragment();
  let dataToDisplay;

  if (filterType === 'discussed') { // сорт по коментам
    dataToDisplay = arrSorted(photosData);
  } else if (filterType === 'random') { // сорт рандом 10
    dataToDisplay = getRandomElementsNum(photosData);
  } else { // стандартный список
    dataToDisplay = photosData;
  }

  const existingPictures = picturesContainer.querySelectorAll('.picture');
  existingPictures.forEach(picture => picture.remove());

  dataToDisplay.forEach(({url, comments, likes, description, id}) => {
    const temp = pictureTemplate.cloneNode(true);

    temp.querySelector('.picture').id = id;
    temp.querySelector('.picture').addEventListener('click', handleOpenPopupClick); // todo: сделать через делегирование
    temp.querySelector('.picture__img').src = url;
    temp.querySelector('.picture__img').alt = description;
    temp.querySelector('.picture__comments').textContent = String(comments.length);
    temp.querySelector('.picture__likes').textContent = String(likes);
    // console.log(String(likes))
    fragment.append(temp);

  });

  picturesContainer.append(fragment);

};

