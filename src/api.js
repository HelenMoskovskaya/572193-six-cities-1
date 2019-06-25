import axios from 'axios';
import {TIME_OUT_FOR_CONFIG_API, MAIN_URL, ServerResponseCode} from './constans.js';


export const configureAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: MAIN_URL,
    timeout: TIME_OUT_FOR_CONFIG_API,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.request.responseURL.indexOf(`/login`) === -1 && error.response.status ===
      ServerResponseCode.FORBIDDEN_CODE) {
      onLoginFail();
      return;
    }
    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
