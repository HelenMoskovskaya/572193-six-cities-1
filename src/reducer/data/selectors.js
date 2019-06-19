import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {calculateDistance} from '../../utils.js';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getActiveSort = (state) => {
  return state[NAME_SPACE].activeSort;
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
    getActiveSort,
    (offers, city, activeSort) => {
      const activeOffers = offers.filter((it) => it.city.name === city.name);
      switch (activeSort) {
        case `Price: low to high`:
          return activeOffers.sort((a, b) => a.price - b.price);

        case `Price: high to low`:
          return activeOffers.sort((a, b) => b.price - a.price);

        case `Top rated first`:
          return activeOffers.sort((a, b) => b.rating - a.rating);

        default: return activeOffers;
      }
    }
);

export const getNeighbourhoodOffers = createSelector(
    getOffers,
    getOfferId,
    (offers, offer) => {
      return offers
      .map((it) => {
        it.distance = calculateDistance(
            offer.location.latitude, offer.location.longitude,
            it.location.latitude, it.location.longitude, `K`);
        return it;
      })
      .sort((a, b) => a.distance - b.distance).slice(1, 4);
    }
);

export const getDetailsOffersForMap = createSelector(
    getNeighbourhoodOffers,
    getOfferId,
    (offers, offer) => {
      return [...offers, offer];
    }
);

export const getSortRewiews = createSelector(
    getReviews,
    (reviews) => {
      return reviews
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      }).slice(0, 10);
    }
);
