import axios from 'axios';
import {TIME_OUT_FOR_CONFIG_API, MAIN_URL} from './constans.js';


export const configureAPI = () => {
  const api = axios.create({
    baseURL: MAIN_URL,
    timeout: TIME_OUT_FOR_CONFIG_API,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
