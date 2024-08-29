import {addImages} from './add-images.js';
import './validate.js';
import './filter.js';
import './effectPhoto.js';
import {makeRequest} from './api.js';
import {LOCAL_STORAGE_DATA_KEY} from './const.js';


makeRequest(
  (data) => {
    addImages(data);
    localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(data));
  },
  () => {
  },
  'GET',
);

