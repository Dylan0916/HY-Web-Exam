import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST,
});

export const get = (url: string, params?: Record<string, unknown>) => {
  return instance.get(url, params).then(resp => resp.data);
};
