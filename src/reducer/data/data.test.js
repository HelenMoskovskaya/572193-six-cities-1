import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import {Operation, ActionType} from './data';
import {mockOffers} from '../../mocks/mocks.js';


describe(`API works correctly`, () => {
  it(`make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const loaderOffers = Operation.loadOffers();

    apiMock.onGet(`/hotels`)
      .reply(200, mockOffers);

    return loaderOffers(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: mockOffers,
        });
      });
  });
});

