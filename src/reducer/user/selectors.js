import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const getUser = (state) => {
  return state[NAME_SPACE].user;
};

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUserData = (state) => {
  return state[NAME_SPACE].user;
};
