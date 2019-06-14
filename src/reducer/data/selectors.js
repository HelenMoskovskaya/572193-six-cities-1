import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {calculateDistance} from '../../utils.js';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getLoadStatus = (state) => {
  return state[NAME_SPACE].isLoadOffers;
};

export const getCityList = (state) => {
  const offers = getOffers(state);
  const cities = [...new Set(offers.map((it) => it.city.name))].slice(0, 6);

  return cities;
};

export const getOfferId = (state, id) => {
  return state[NAME_SPACE].offers.find((it) => it.id === Number(id));
};

export const getActiveOffers = createSelector(
    getOffers,
    getActiveCity,
    (offers, city) => {
      return offers.filter((it) => it.city.name === city.name);
    }
);

export const getNeighbourhoodOffers = createSelector(
    getOffers,
    getOfferId,
    (offers, offer) => {
      return offers
      .map((it) => {
        it.distance = calculateDistance(
            offer.city.location.latitude, offer.city.location.longitude,
            it.location.latitude, it.location.longitude, `K`);
        return it;
      })
      .sort((a, b) => a.distance - b.distance).slice(0, 3);
    }
);


