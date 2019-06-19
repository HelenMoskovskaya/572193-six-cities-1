import React from 'react';
import {INPUT_STARS_FOR_REVIEWS} from '../../constans.js';
import Input from '../input/input.jsx';
import TextArea from '../text-area/text-area.jsx';

const InitialState = {
  rating: null,
  comment: ``,
};

const ReviewsForm = (props) => {
  const {disabled} = props;
  return <form className="reviews__form form" action="#" method="post" disabled={disabled}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {INPUT_STARS_FOR_REVIEWS.map((it) =>
        <React.Fragment key={it.value}>
          <Input
            className="form__rating-input visually-hidden"
            name="rating"
            value={it.value}
            id={`${it.value}-stars`}
            type="radio"
            required />
          <label htmlFor={`${it.value}-stars`} className="reviews__rating-label form__rating-label" title={it.title}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>)
      }
    </div>
    <TextArea
      className="reviews__textarea form__textarea"
      id="comment"
      name="comment"
      placeholder="Tell how was your stay, what you like and what can be improved"
      required
      minLength={50}
      maxLength={300}
      />
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set
        <span className="reviews__star">rating</span>
        and describe your stay with at least
        <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button"
        type="submit"
        disabled={disabled}>Submit</button>
    </div>
  </form>;
};

export default ReviewsForm;
