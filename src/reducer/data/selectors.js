import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {calculateDistance} from '../../utils.js';
import {MAX_CITIES_LENGTH, MAX_NEAREST_OFFERS} from '../../constans.js';

const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getLoadError = (state) => {
  return state[NAME_SPACE].errorLoad;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getActiveItem = (state) => {
  return state[NAME_SPACE].activeOffer;
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

export const getFavorites = (state) => {
  return state[NAME_SPACE].favorites;
};
 
export const getCityList = (state) => {
  const offers = getOffers(state);
  const cities = [...new Set(offers.map((it) => it.city.name))].slice(0, MAX_CITIES_LENGTH);

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
      .sort((a, b) => a.distance - b.distance).slice(1, MAX_NEAREST_OFFERS + 1);
    }
);

export const getDetailsOffersForMap = createSelector(
    getNeighbourhoodOffers,
    getOfferId,
    (offers, offer) => {
      return [...offers, offer];
    }
);

const getPreFavorites = (array) => {
  const byCity = {};

  array.forEach((offer) => {
    if (!byCity[offer.city.name]) {
      byCity[offer.city.name] = [];
    }
    byCity[offer.city.name].push(offer);
  });

  return byCity;
};

export const getOffersByCity = createSelector(
    getFavorites,
    (offers) => {
      return getPreFavorites(offers);
    }
);
