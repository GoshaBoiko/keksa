import {addImages} from './add-images.js';
import './validate.js';
import './effectPhoto.js';
import {makeRequest} from './api.js';


makeRequest(
  (data) => {
    addImages(data)
    console.log(data)
  },
  () => {},
  'GET',
  )



