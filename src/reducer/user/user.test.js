import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import {Operation, ActionType, ActionCreatorUser, reducer} from './user';
import {loginInMock} from '../../mocks/mocks';
import {ActionType as ActionTypedata} from '../data/data.js';
import {userData} from '../../mocks/mocks.js';

const initialState = {
  isAuthorizationRequired: false,
  user: {}
};

describe(`Test API works correctly`, () => {
  it(`API correctly post to /login`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const authorizeUser = Operation.authorizeUser(loginInMock);

    apiMock.onPost(`/login`)
      .reply(200, loginInMock);

    return authorizeUser(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOGIN,
          payload: loginInMock,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionTypedata.SET_ACTIVE_OFFER,
          payload: null,
        });
      });
  });

  it(`API correctly get to /login`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const saveAuthorizationData = Operation.saveAuthorizationData();

    apiMock.onGet(`/login`)
      .reply(200, userData);

    return saveAuthorizationData(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGIN,
          payload: userData,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });
      });
  });
});

describe(`Test ActionCreator  user`, () => {
  it(`action requireAuthorization`, () => {
    expect(ActionCreatorUser.requireAuthorization(true)).toEqual({
      payload: true,
      type: ActionType.REQUIRED_AUTHORIZATION,
    });
  });

  it(`action logIn`, () => {
    expect(ActionCreatorUser.logIn(userData)).toEqual({
      payload: userData,
      type: ActionType.LOGIN,
    });
  });
});

describe(`Test reducer user`, () => {
  it(`requireAuthorization`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    })).toEqual({
			isAuthorizationRequired: true,
			user: {}
    });
	});

	it(`logIn`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.LOGIN,
      payload: userData,
    })).toEqual({
			user: userData,
			isAuthorizationRequired: false
    });
	});
});