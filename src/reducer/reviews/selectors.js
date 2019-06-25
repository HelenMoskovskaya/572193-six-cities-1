import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';
import {MAX_REVIEWS} from '../../constans.js';


const NAME_SPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getErrors = (state) => {
  return state[NAME_SPACE].postReviewsError;
};

export const getCheckReviewSend = (state) => {
  return state[NAME_SPACE].isReviewSend;
};

export const getSortRewiews = createSelector(
    getReviews,
    (reviews) => {
      return reviews
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      }).slice(0, MAX_REVIEWS);
    }
);
