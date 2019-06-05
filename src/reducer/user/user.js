import {adaptToCamelCase} from '../../utils.js';

const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOGIN: `LOGIN`
};

const ActionCreatorUser = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),

  logIn: (user) => ({
    type: ActionType.LOGIN,
    payload: user
  })
};

const Operation = {
  authorizeUser: (email, password) => (dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreatorUser.requireAuthorization());
          dispatch(ActionCreatorUser.logIn(response.data));
        }
      });
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
