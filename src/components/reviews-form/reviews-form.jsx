import React from 'react';
import {INPUT_STARS_FOR_REVIEWS} from '../../constans.js';
import withReviewsForm from '../../hocs/with-reviews-form.jsx';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Operation} from '../../reducer/reviews/reviews.js';
import {getErrors} from '../../reducer/reviews/selectors';
import ErrorMessage from '../error-message/error-message.jsx';


const ReviewsForm = (props) => {
  const {disabled, onFormChange, onSubmitForm, form, postReview, id, error} = props;
  const submit = (evt) => {
    evt.preventDefault();
    postReview(id, form);
    onSubmitForm();
  };
  return <React.Fragment>
    <form className="reviews__form form" action="#" method="post"
      onSubmit={
        submit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {INPUT_STARS_FOR_REVIEWS.map((it) =>
          <React.Fragment key={it.title}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={it.value}
              id={`${it.value}-stars`}
              type="radio"
              checked={Number(form.rating) === it.value}
              onChange={onFormChange}
              required
            />
            <label htmlFor={`${it.value}-stars`} className="reviews__rating-label form__rating-label" title={it.title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>)
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        required
        onChange={onFormChange}
        minLength={50}
        maxLength={300}
        value={form.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set
          <span className="reviews__star">rating</span>
        and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          disabled={disabled}
          type="submit"
        >Submit</button>
      </div>
    </form>

    {(error !== null) ? <ErrorMessage /> : null}

  </React.Fragment>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  error: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  postReview: (id, review) => {
    dispatch(Operation.postReview(id, review));
  },
});

ReviewsForm.propTypes = {

};

export {ReviewsForm};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReviewsForm
)(ReviewsForm);
