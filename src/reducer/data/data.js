import {adaptToCamelCase} from '../../utils.js';

const initialState = {
  city: {},
  offers: [],
  isLoadOffers: false,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  SUCCESS_LOAD: `SUCCESS_LOAD`
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
};


const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreatorData.loadOffers(response.data));
        dispatch(ActionCreatorData.successLoad(true));
      });
  },
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
  }

  return state;
};

export {ActionCreatorData, reducer, ActionType, Operation};
