import axios from 'axios';

export const get = url =>
  axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
