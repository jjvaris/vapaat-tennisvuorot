import axios from 'axios';

const client = axios.create({ timeout: 5000 });

export const get = url =>
  client.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
