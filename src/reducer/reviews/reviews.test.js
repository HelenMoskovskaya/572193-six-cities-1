import MockAdapter from 'axios-mock-adapter';
import {configureAPI} from '../../api';
import {Operation, ActionType, ActionCreator, reducer} from './reviews';
import {reviewsMock, reviewItemMock} from '../../mocks/mocks.js';

const error = null;
const initialState = {
  reviews: [],
  isReviewSend: false,
  postReviewsError: null
};

describe(`Test API works correctly`, () => {
  it(`API correctly get to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, jest.fn());
    const apiMock = new MockAdapter(api);
    const loaderReviews = Operation.loadReviews(1);

    apiMock.onGet(`/comments/1`)
      .reply(200, reviewsMock);

    return loaderReviews(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: reviewsMock,
        });
      });
  });

  it(`API correctly post to /comments/id`, function () {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch, dispatch);
    const apiMock = new MockAdapter(api);
    const postReview = Operation.postReview(1, {reviewItemMock});

    apiMock.onPost(`/comments/1`)
      .reply(200, reviewItemMock);

    return postReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.POST_REVIEW,
          payload: reviewItemMock,
        });
      });
  });
});

describe(`Test ActionCreator reviews`, () => {
  it(`loadReviews`, () => {
    expect(ActionCreator.loadReviews(reviewsMock)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: reviewsMock,
    });
  });

  it(`postReview`, () => {
    expect(ActionCreator.postReview(reviewItemMock)).toEqual({
      type: ActionType.POST_REVIEW,
      payload: reviewItemMock,
    });
  });

  it(`getError`, () => {
    expect(ActionCreator.getError(error)).toEqual({
      type: ActionType.POST_REVIEWS_ERROR,
      payload: error,
    });
  });

  it(`getIsReviewsend`, () => {
    expect(ActionCreator.getIsReviewsend(true)).toEqual({
      type: ActionType.CHECK_REVIEW_SEND,
      payload: true,
    });
  });
});

describe(`Test reducer reviews`, () => {
  it(`loadReviews`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviewsMock,
    })).toEqual({
			reviews: reviewsMock,
			isReviewSend: false,
  		postReviewsError: null
    });
	});
	
	it(`postReview`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.POST_REVIEW,
      payload: reviewItemMock,
    })).toEqual({
			reviews: reviewItemMock,
			isReviewSend: false,
  		postReviewsError: null
    });
	});
	
	it(`getError`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.POST_REVIEWS_ERROR,
      payload: error,
    })).toEqual({
			reviews: [],
			isReviewSend: false,
  		postReviewsError: error
    });
	});
	
	it(`getIsReviewsend`, () => {
    expect(reducer({...initialState}, {
      type: ActionType.CHECK_REVIEW_SEND,
      payload: true,
    })).toEqual({
			reviews: [],
			isReviewSend: true,
  		postReviewsError: null
    });
  });
});