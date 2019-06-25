import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import {Operation, ActionType, ActionCreatorData, reducer} from './data';
import {mockOffers, mockOffer, cityMock} from '../../mocks/mocks.js';

let initialState = {}
const error = null

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

  it(`make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const loaderFavorites = Operation.loadFavorites();

    apiMock.onGet(`/favorite`)
      .reply(200, mockOffers);

    return loaderFavorites(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: mockOffers,
        });
      });
  });

  it(`make a correct post to /favorite/:id/:status`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const changeFavorites = Operation.changeFavorites(mockOffer);

    apiMock.onPost(`/favorite/1/1`)
      .reply(200, mockOffer);

    return changeFavorites(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFERS,
          payload: mockOffer,
        });
      });
  });
});

describe(`Test ActionCreator reducer data`, () => {
  it(`action changeCity`, () => {
    expect(ActionCreatorData.changeCity(cityMock)).toEqual({
      payload: cityMock,
      type: ActionType.CHANGE_CITY,
    });
  });

  it(`action set Active Offer`, () => {
    expect(ActionCreatorData.checkActiveOffer(mockOffer)).toEqual({
      payload: mockOffer,
      type: ActionType.SET_ACTIVE_OFFER,
    });
  });

  it(`action sortOffers`, () => {
    expect(ActionCreatorData.sortOffers(mockOffers)).toEqual({
      payload: mockOffers,
      type: ActionType.SORT_OFFERS,
    });
  });

  it(`action set loadError`, () => {
    expect(ActionCreatorData.setLoadError(null)).toEqual({
      payload: null,
      type: ActionType.SET_LOAD_ERROR,
    });
  });

  it(`action loadData status`, () => {
    expect(ActionCreatorData.successLoad(true)).toEqual({
      payload: true,
      type: ActionType.SUCCESS_LOAD,
    });
  });

  it(`action loadOffers`, () => {
    expect(ActionCreatorData.loadOffers(mockOffers)).toEqual({
      payload: mockOffers,
      type: ActionType.LOAD_OFFERS,
    });
  });

  it(`action loadFavorites`, () => {
    expect(ActionCreatorData.loadFavorites(mockOffers)).toEqual({
      payload: mockOffers,
      type: ActionType.LOAD_FAVORITES,
    });
  });

  it(`action updateOffers`, () => {
    expect(ActionCreatorData.updateOffers(mockOffers)).toEqual({
      payload: mockOffers,
      type: ActionType.UPDATE_OFFERS,
    });
  });
});

describe(`Test reducer data`, () => {
  it(`should handle CHANGE_CITY`, () => {
    const action = {
      type: ActionType.CHANGE_CITY,
      payload: `Amsterdam`,
    };

    initialState.offers = [
      {city: {name: `Paris`}},
      {city: {name: `Amsterdam`}}
    ];

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      city: {name: `Amsterdam`},
      activeOffer: null
    });
  });

  it(`checkActiveOffer`, () => {
    const action = {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: cityMock,
    };

    const currentState = {
      activeOffer: null
    }

    expect(reducer(currentState, action)).toEqual({
      ...currentState,
      activeOffer: cityMock
    });
  });

  it(`loadOffers`, () => {
    const action = {
      type: ActionType.LOAD_OFFERS,
      payload: mockOffers,
    };

    initialState = {
      offers: [],
      city: {}
    }

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      offers: mockOffers,
      city: cityMock
    });
  });

  it(`successLoad`, () => {
    const action = {
      type: ActionType.SUCCESS_LOAD,
      payload: true,
    };

    initialState.isLoadOffers = false

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isLoadOffers: true
    });
  });

  it(`sortOffers`, () => {
    const action = {
      type: ActionType.SORT_OFFERS,
      payload: `Popular`,
    };

    initialState.isLoadOffers = `Popular`

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      activeSort: `Popular`,
      activeOffer: null
    });
  });

  it(`loadFavorites`, () => {
    const action = {
      type: ActionType.LOAD_FAVORITES,
      payload: mockOffers,
    };

    initialState.favorites = []

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      favorites: mockOffers
    });
  });

  it(`updateOffers`, () => {
    const action = {
      type: ActionType.UPDATE_OFFERS,
      payload: {id: 1, title: `Offer1`, rating: 4.3, price: 120},
    };

    const currentState = {
      offers: [
        {id: 1, title: `Offer1`, rating: 4.3, price: 120},
        {id: 2, title: `Offer2`, rating: 5.3, price: 180}
      ],
      favorites: [
        {id: 1, title: `Offer1`, rating: 4.3, price: 120}
      ]
    }

    expect(reducer(currentState, action)).toEqual({
      ...currentState,
      offers: [
        {id: 1, title: `Offer1`, rating: 4.3, price: 120},
        {id: 2, title: `Offer2`, rating: 5.3, price: 180}
      ],
      favorites: [
      ]
    });
  });

  it(`setLoadError`, () => {
    const action = {
      type: ActionType.SET_LOAD_ERROR,
      payload: error,
    };

    initialState.error = null

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      errorLoad: null,
    });
  });
});