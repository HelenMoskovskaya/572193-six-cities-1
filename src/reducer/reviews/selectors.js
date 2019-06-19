import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getSortRewiews = createSelector(
    getReviews,
    (reviews) => {
      return reviews
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      }).slice(0, 10);
    }
);
