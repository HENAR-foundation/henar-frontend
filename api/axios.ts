import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://134.209.95.248:8080/v1/',
  withCredentials: true,
  timeout: 1000,
  //   headers: { 'X-Custom-Header': 'foobar' },
});

instance.defaults.withCredentials = true;

export default instance;
