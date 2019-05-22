import offers from './mocks/offers.js';


const initialState = {
  city: ``,
  offers: offers.filter((it) => it.city === offers[0].city)
};


const ActionCreator = {
  changeCity: (activeCity) => ({
    type: `CHANGE_CITY`,
    payload: activeCity
  }),

  getOffers: (activeCity, array) => {
    return {
      type: `GET_OFFERS`,
      payload: array.filter((it) => it.city === activeCity)
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload
    });

    case `GET_OFFERS`: return Object.assign({}, state, {
      offers: action.payload
    });
  }
  return state
}

export {ActionCreator, reducer};
