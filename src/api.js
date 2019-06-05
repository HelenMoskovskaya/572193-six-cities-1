import axios from 'axios';
import {ActionCreatorUser} from './reducer/user/user.js';

export const MAIN_URL = `https://es31-server.appspot.com/six-cities`;

export const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: MAIN_URL,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreatorUser.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
