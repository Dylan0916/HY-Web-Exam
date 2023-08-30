import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

export const get = (url: string, params?: Record<string, unknown>) => {
  return instance.get(url, params).then(resp => resp.data);
};
