import {adaptToCamelCase} from '../../utils.js';

const initialState = {
  city: {},
  activeOffer: null,
  offers: [],
  isLoadOffers: false,
  activeSort: `Popular`,
  favorites: [],
  errorLoad: null
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SUCCESS_LOAD: `SUCCESS_LOAD`,
  SORT_OFFERS: `SORT_OFFERS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  SET_LOAD_ERROR: `SET_LOAD_ERROR`
};

const ActionCreatorData = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity
  }),

  checkActiveOffer: (activeOffer) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: activeOffer
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: adaptToCamelCase(offers)
  }),

  successLoad: (status) => ({
    type: ActionType.SUCCESS_LOAD,
    payload: status
  }),

  sortOffers: (activeSort) => ({
    type: ActionType.SORT_OFFERS,
    payload: activeSort
  }),

  loadFavorites: (favorites) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: adaptToCamelCase(favorites)
  }),

  updateOffers: (offers) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: adaptToCamelCase(offers)
  }),

  setLoadError: (error) => ({
    type: ActionType.SET_LOAD_ERROR,
    payload: error
  }),

};


const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreatorData.loadOffers(response.data));
        dispatch(ActionCreatorData.successLoad(true));
      })
      .catch((error) => {
        dispatch(ActionCreatorData.setLoadError(error.response.status));
      });
  },

  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreatorData.loadFavorites(response.data));
    })
    .catch(() => {});
  },

  changeFavorites: (offer) => (dispatch, _getState, api) => {
    const id = offer.id;
    const status = offer.isFavorite ? `0` : `1`;

    return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      dispatch(ActionCreatorData.updateOffers(response.data));
    })
    .catch(() => {});
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: state.offers.filter((it) => it.city.name === action.payload)[0].city,
        activeOffer: null
      });

    case `SET_ACTIVE_OFFER`:
      return Object.assign({}, state, {
        activeOffer: action.payload
      });

    case `LOAD_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload,
        city: action.payload[Math.floor(Math.random() * action.payload.length)].city
      });

    case `SUCCESS_LOAD`:
      return Object.assign({}, state, {
        isLoadOffers: !state.isLoadOffers
      });

    case `SORT_OFFERS`:
      return Object.assign({}, state, {
        activeSort: action.payload,
        activeOffer: null
      });

    case `LOAD_FAVORITES`:
      return Object.assign({}, state, {
        favorites: action.payload,
      });

    case `UPDATE_OFFERS`:
      return Object.assign({}, state, {
        offers: state.offers.map((offer) => (offer.id === action.payload.id) ? action.payload : offer),
        favorites: state.favorites.filter((favorite) => favorite.id !== action.payload.id),
      });

    case `SET_LOAD_ERROR`:
      return Object.assign({}, state, {
        errorLoad: action.payload,
      });
  }

  return state;
};

export {ActionCreatorData, reducer, ActionType, Operation};
