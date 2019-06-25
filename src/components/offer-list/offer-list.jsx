import React from 'react';
import PropTypes from 'prop-types';
import CardOffer from '../offer-card/offer-card.jsx';
import {propTypesConstans} from '../../prop-types.js';


const OfferList = (props) => {
  const {offers, needLink, favoriteClass, small} = props;

  return <div className={`${favoriteClass ? `favorites__list` : `cities__places-list`} places__list tabs__content`}>
    {offers.map((offer) =>
      <CardOffer
        key={offer.id}
        offer={offer}
        needLink={needLink}
        favoriteClass={favoriteClass}
        small={small}
      />
    )}
  </div>;
};

OfferList.propTypes = {
  offers: PropTypes.arrayOf(propTypesConstans.OFFER),
  needLink: PropTypes.bool,
  handleActivateElement: PropTypes.func,
  favoriteClass: PropTypes.bool,
  small: PropTypes.bool
};

export default OfferList;
