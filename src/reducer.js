import offers from './mocks/offers.js';

const initialState = {
  city: `Amsterdam`,
  offers
};


const ActionCreator = {
  changeCity: (activeCity) => ({
    type: `CHANGE_CITY`,
    payload: activeCity
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload
      });
    }
  return state
}

export {ActionCreator, reducer};
