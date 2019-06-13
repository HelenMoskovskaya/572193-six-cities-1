import {adaptToCamelCase} from '../../utils.js';
import {ServerResponseCode} from '../../constans.js';

const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`,
};

const ActionCreatorUser = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),

  logIn: (user) => ({
    type: ActionType.LOGIN,
    payload: adaptToCamelCase(user)
  }),

};

const Operation = {
  authorizeUser: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        dispatch(ActionCreatorUser.requireAuthorization(true));
        dispatch(ActionCreatorUser.logIn(response.data));
      });
  },

  saveAuthorizationData: () => (dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if (response.status === ServerResponseCode.SUCCESS_CODE) {
          dispatch(ActionCreatorUser.logIn(response.data));
          dispatch(ActionCreatorUser.requireAuthorization(true));
        }
      })
      .catch(() =>{});
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: !state.isAuthorizationRequired});

    case ActionType.LOGIN:
      return Object.assign({}, state, {
        user: adaptToCamelCase(action.payload)});
  }

  return state;
};

export {ActionCreatorUser, reducer, ActionType, Operation};
