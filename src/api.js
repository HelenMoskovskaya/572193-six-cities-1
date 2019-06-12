import axios from 'axios';
import {ServerResponseCode, TIME_OUT_FOR_CONFIG_API, MAIN_URL} from './constans.js';


export const configureAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: MAIN_URL,
    timeout: TIME_OUT_FOR_CONFIG_API,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.request.responseURL.indexOf(`/login`) === -1 && err.response.status === ServerResponseCode.FORBIDDEN_CODE) {
      onLoginFail();
      return;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
