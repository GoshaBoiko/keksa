import {LOCAL_STORAGE_DATA_KEY} from './const.js';
import {isEscape} from './utils.js';
import {addComments, removeHandleShowCommentsMore} from './comments.js';

const BODY_LOCK = 'modal-open';
const BIG_PICTURE_HIDDEN = 'hidden';
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const image = bigPicture.querySelector('.big-picture__img img');
const imageDesc = bigPicture.querySelector('.social__caption');
const imageLikes = bigPicture.querySelector('.likes-count');

export const closePopup = ()=> {
  bigPicture.classList.add(BIG_PICTURE_HIDDEN);
  document.body.classList.remove(BODY_LOCK);
  bigPictureClose.removeEventListener('click', handleClosePopupClick);
  document.removeEventListener('keydown', handleClosePopupKeydown);
  removeHandleShowCommentsMore();
};

const openPopup = ()=> {
  bigPicture.classList.remove(BIG_PICTURE_HIDDEN);
  document.body.classList.add(BODY_LOCK);
  bigPictureClose.addEventListener('click', handleClosePopupClick);
  document.addEventListener('keydown', handleClosePopupKeydown);
};

const setBigPicture = (obj)=> {
  const {url, description, likes, comments} = obj;
  image.src = url;
  image.alt = description;
  imageDesc.textContent = description;
  imageLikes.textContent = String(likes);
  addComments(comments);
};

function handleClosePopupClick() {
  closePopup();
}

function handleClosePopupKeydown(evt) {
  if (isEscape(evt.key)) {
    closePopup();
  }
}

export const handleOpenPopupClick = (evt)=> {
  const photosData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
  const pictureObj = photosData.find((item) => item.id === Number(evt.currentTarget.id));
  setBigPicture(pictureObj);
  openPopup();
};

// делаю лайки
let countLikes = 0;
let isLiked = false;

const addLikes = ()=> {
  imageLikes.classList.remove('active');
  imageLikes.addEventListener('click', ()=> {
    if (!isLiked) {
      countLikes = Number(imageLikes.textContent) + 1;
      imageLikes.textContent = countLikes;
      imageLikes.classList.add('active');
      isLiked = true;
    }  else {
      countLikes = Number(imageLikes.textContent) - 1;
      imageLikes.textContent = countLikes;
      imageLikes.classList.remove('active');
      isLiked = false;
    }
  })

}
addLikes()

