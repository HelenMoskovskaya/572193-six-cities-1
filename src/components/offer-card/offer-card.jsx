import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {ActionCreatorData, Operation} from '../../reducer/data/data.js';
import {getActiveItem} from '../../reducer/data/selectors.js';
import Bookmark from '../bookmark/bookmark.jsx';
import {ImageOfferSize} from '../../constans.js';
import {propTypesConstans} from '../../prop-types.js';
import {CountRating} from '../../constans.js';


const CardOffer = (props) => {
  const {offer, needLink, favoriteClass, changeFavorites, checkActiveOffer, small} = props;

  return <article className={`${favoriteClass ? `favorites__card` : `cities__place-card`} place-card`}>
    {offer.isPremium && (<div className="place-card__mark">
      <span>Premium</span>
    </div>)}
    <div className={`${favoriteClass ? `favorites` : `cities`}__image-wrapper place-card__image-wrapper`}>
      {needLink ? <Link to={`/offer/${offer.id}`}>
        <img className="place-card__image" src={offer.previewImage}
          width={small ? ImageOfferSize.SMALL.width : ImageOfferSize.BIG.width}
          height={small ? ImageOfferSize.SMALL.height : ImageOfferSize.BIG.height}
          alt="Place image"/>
      </Link> : <a href="#" onClick={(evt) => {
        evt.preventDefault();
        checkActiveOffer(offer);
      }}>
        <img className="place-card__image" src={offer.previewImage}
          width={small ? ImageOfferSize.SMALL.width : ImageOfferSize.BIG.width}
          height={small ? ImageOfferSize.SMALL.height : ImageOfferSize.BIG.height}
          alt="Place image"
        />
      </a>}
    </div>
    <div className={`${favoriteClass ? `favorites__card-info` : ``} place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <Bookmark
          isFavorite={offer.isFavorite}
          small={true}
          className={`place-card__bookmark-button`}
          changeFavorites={() => {
            changeFavorites(offer);
          }}/>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${Math.round(offer.rating) / CountRating.MAX_POINT * CountRating.CONVERTER_FOR_PERCENT}` + `%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${offer.id}`}>
          {offer.title}
        </Link>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeItem: getActiveItem(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeFavorites: (offer) => {
    dispatch(Operation.changeFavorites(offer));
  },

  checkActiveOffer: (offer) => {
    dispatch(ActionCreatorData.checkActiveOffer(offer));
  },
});

CardOffer.propTypes = {
  offer: propTypesConstans.OFFER,
  needLink: PropTypes.bool,
  favoriteClass: PropTypes.bool,
  changeFavorites: PropTypes.func.isRequired,
  checkActiveOffer: PropTypes.func.isRequired,
  onActivateElement: PropTypes.func,
  small: PropTypes.bool
};

export {CardOffer};
export default connect(mapStateToProps, mapDispatchToProps)(CardOffer);
