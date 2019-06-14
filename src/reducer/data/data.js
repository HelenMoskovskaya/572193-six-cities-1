import {adaptToCamelCase} from '../../utils.js';

const initialState = {
  city: {},
  offers: [],
  isLoadOffers: false,
  reviews: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SUCCESS_LOAD: `SUCCESS_LOAD`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreatorData = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: adaptToCamelCase(offers)
  }),

  successLoad: (status) => ({
    type: ActionType.SUCCESS_LOAD,
    payload: status
  }),

  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: adaptToCamelCase(reviews)
  }),
};


const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreatorData.loadOffers(response.data));
        dispatch(ActionCreatorData.successLoad(true));
      });
  },

  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
    .then((responce) => {
      dispatch(ActionCreatorData.loadReviews(responce.data));
    });
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: state.offers.filter((it) => it.city.name === action.payload)[0].city
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

    case `LOAD_REVIEWS`:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
  }

  return state;
};

export {ActionCreatorData, reducer, ActionType, Operation};
