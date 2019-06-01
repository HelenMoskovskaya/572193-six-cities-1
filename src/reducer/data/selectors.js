import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers
}

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city
}

export const getCityList = (state) => {
  const offers = getOffers(state);
  const cities = [...new Set(offers.map((it) => it.city.name))].slice(0, 6);

  return cities
}

const randomFilter = (_state) => {
  return Math.random() > 0.5;
};

export const getActiveOffers = createSelector (
  getOffers,
  getActiveCity,
  (offers, city) => {
    return offers.filter((it) => it.city.name === city)}
    )

