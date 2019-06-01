import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api.js';
import {ActionType, Operation, ActionCreator} from './data.js';


describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /offers`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, jest.fn(), api).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return the correct value, when the city changes`, () => {
    expect(ActionCreator.changeCity(`Cologne`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Cologne`,
    });
  })
});
