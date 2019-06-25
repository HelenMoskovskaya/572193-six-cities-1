import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/data/data.js';
import Bookmark from '../bookmark/bookmark.jsx';
import {propTypesConstans} from '../../prop-types.js';
import {CountRating} from '../../constans.js';

const DetailsInfo = (props) => {
  const {offer, changeFavorites} = props;
  return <React.Fragment>
    {offer.isPremium && <div className="property__mark">
      <span>Premium</span>
    </div>}
    <div className="property__name-wrapper">
      <h1 className="property__name">
        {offer.title}
      </h1>
      <Bookmark
        isFavorite={offer.isFavorite}
        className={`property__bookmark-button`}
        changeFavorites={()=> {
          changeFavorites(offer);
        }}/>
    </div>
    <div className="property__rating rating">
      <div className="property__stars rating__stars">
        <span style={{width: `${Math.round(offer.rating) / CountRating.MAX_POINT * CountRating.CONVERTER_FOR_PERCENT}` + `%`}}></span>
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
  </React.Fragment>;
};

const mapDispatchToProps = (dispatch) => ({
  changeFavorites: (offer) => {
    dispatch(Operation.changeFavorites(offer));
  }
});

DetailsInfo.propTypes = {
  offer: propTypesConstans.OFFER,
  changeFavorites: PropTypes.func.isRequired,
};

export {DetailsInfo};
export default connect(null, mapDispatchToProps)(DetailsInfo);
