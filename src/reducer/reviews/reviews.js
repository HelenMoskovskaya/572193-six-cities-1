import {adaptToCamelCase} from '../../utils.js';
import {ServerResponseCode} from '../../constans.js';

const initialState = {
  reviews: [],
  isReviewSend: false,
  postReviewsError: null
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  POST_REVIEWS_ERROR: `POST_REVIEWS_ERROR`,
  CHECK_REVIEW_SEND: `CHECK_REVIEW_SEND`
};

const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: adaptToCamelCase(reviews)
  }),

  postReview: (reviews) => ({
    type: ActionType.POST_REVIEW,
    payload: adaptToCamelCase(reviews)
  }),

  getError: (postReviewsError) => ({
    type: ActionType.POST_REVIEWS_ERROR,
    payload: postReviewsError
  }),

  getIsReviewsend: (form) => ({
    type: ActionType.CHECK_REVIEW_SEND,
    payload: form
  }),
};


const Operation = {
  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
    .then((response) => {
      dispatch(ActionCreator.loadReviews(response.data));
    })
    .catch(() => {});
  },

  postReview: (offerId, review) => (dispatch, _getState, api) => {
    return api.post(`/comments/${offerId}`, review)
    .then((response) => {
      dispatch(ActionCreator.postReview(response.data));
      if (response.status === ServerResponseCode.SUCCESS_CODE) {
        dispatch(ActionCreator.getIsReviewsend(true));
        dispatch(ActionCreator.getIsReviewsend(false));

      }
    })
    .catch((error) => {
      dispatch(ActionCreator.getError(error));
    });
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_REVIEWS`:
      return Object.assign({}, state, {
        reviews: action.payload,
      });

    case `POST_REVIEW`:
      return Object.assign({}, state, {
        reviews: action.payload,
      });

    case `POST_REVIEWS_ERROR`:
      return Object.assign({}, state, {
        postReviewsError: action.payload,
      });

    case `CHECK_REVIEW_SEND`:
      return Object.assign({}, state, {
        isReviewSend: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionCreator};

