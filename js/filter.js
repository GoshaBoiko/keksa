import {addImages} from './add-images.js';
import {photosData} from './mock.js';
import {throttle} from './utils.js';

const filterSection = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

filterSection.classList.remove('img-filters--inactive');

const a = filterDefault.addEventListener('click', () => {
  throttle(addImages(photosData, 'default'), 500)
});

const b = filterRandom.addEventListener('click', () => {
  throttle(addImages(photosData, 'random'), 500)
});

const c = filterDiscussed.addEventListener('click', () => {
  throttle(addImages(photosData, 'discussed'), 500)
});


