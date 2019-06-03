import {adaptToCamelCase, getRandom} from '../../utils.js';

const initialState = {
  city: ``,
  offers: []
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`
};

const ActionCreator = {
  changeCity: (activeCity) => ({
    type: ActionType.CHANGE_CITY,
    payload: activeCity
  }),

  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: adaptToCamelCase(offers)
  }),
};


const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });

    case `LOAD_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload,
        city: action.payload[Math.floor(Math.random() * action.payload.length)].city.name
      });
  }

  return state;
};

export {ActionCreator, reducer, ActionType, Operation};
