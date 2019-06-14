import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Svg from '../svg/svg.jsx';
import Header from '../header/header.jsx';
import {connect} from 'react-redux';
import {Operation as DataOperation} from '../../reducer/data/data';
import {getLoadStatus, getActiveOffers, getOfferId, getNeighbourhoodOffers} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import MapCity from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offer, isLoadOffers, isAuthorizationRequired, userData, neighbourhoodOffers} = this.props;
    if (isLoadOffers) {
      return <div className="page">
        <Svg />
        <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>
        <main className="page__main page__main--property">
          <section className="property">

            <div className="property__gallery-container container">
              <div className="property__gallery">
                {offer.images.slice(0, 6).map((image) => {
                  return <div key={image} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo offer" />
                  </div>;
                })}
              </div>
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                {offer.isPremium && <div className="property__mark">
                  <span>Premium</span>
                </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {offer.title}
                  </h1>
                  <button className={`property__bookmark-button button
									${offer.isFavorite && `property__bookmark-button--active`}`}
                  type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">
                      {offer.isFavorite ? `In bookmarks` : `To bookmarks`}
                    </span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${Math.round(offer.rating) / 5 * 100}` + `%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {offer.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {offer.bedrooms}
                  </li>
                  <li className="property__feature property__feature--adults">
                    {offer.maxAdults}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{offer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {offer.goods.map((good) => {
                      return <li key={good} className="property__inside-item">{good}</li>;
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={`/` + `${offer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {offer.host.name}
                    </span>
                    <span className="property__user-status">
                      {offer.host.isPro && `Pro`}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {offer.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  <ul className="reviews__list">
                    <li className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src="/img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">
									Max
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{width: `94%`}}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
									A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                        </p>
                        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                      </div>
                    </li>
                  </ul>
                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
								To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            <section className="property__map map">
              <MapCity
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OfferList offers={neighbourhoodOffers} />
              </div>
            </section>
          </div>
        </main>
      </div>;
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return Object.assign({}, ownProps, {
    isLoadOffers: getLoadStatus(state),
    offers: getActiveOffers(state),
    offer: getOfferId(state, id),
    isAuthorizationRequired: getAuthorizationStatus(state),
    userData: getUserData(state),
    neighbourhoodOffers: getNeighbourhoodOffers(state, id),
  });
};
const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },
});

OfferPage.propTypes = {
  offer: PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      })
    }),
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired
    }),
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }),
    id: PropTypes.number.isRequired
  }),
  isLoadOffers: PropTypes.bool.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string
  }),
};

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
