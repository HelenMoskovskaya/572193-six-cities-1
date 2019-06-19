import {adaptToCamelCase} from '../../utils.js';

const initialState = {
  reviews: []
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: adaptToCamelCase(reviews)
  }),
};


const Operation = {
  loadReviews: (offerId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${offerId}`)
    .then((responce) => {
      dispatch(ActionCreator.loadReviews(responce.data));
    });
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_REVIEWS`:
      return Object.assign({}, state, {
        reviews: action.payload,
      });
  }

  return state;
};

export {reducer, Operation};
