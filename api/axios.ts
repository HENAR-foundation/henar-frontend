import axios from 'axios';
const env = process.env.NODE_ENV;
export const baseURL = env === 'production' ? 'https://healthnet.am/api/v1' : 'http://localhost:8080/v1'

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

const protectedRoutes = ['/'];

instance.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    // console.log(config, 'WWWWW');
    return config;
  },
  function (error) {
    const status = error.response?.status || 500;
    if (
      typeof window !== 'undefined' &&
      status === 401 &&
      window.location.pathname !== '/login'
    ) {
      //   window.location =
      //     window.location.protocol + '//' + window.location.host + '/login';
    } else {
      return Promise.reject(error); // Delegate error to calling side
    }
  }
);

instance.defaults.withCredentials = true;

export default instance;
