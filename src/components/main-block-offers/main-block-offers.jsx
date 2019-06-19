import React from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';
import MapCity from '../map/map.jsx';
import Sorting from '../sorting/sorting.jsx';

const MainBlockOffers = (props) => {
  const {offers,
    city,
    handleActivateElement,
    activeItem,
  } = props;

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${offers.length} ${offers.length === 1 ? `place` : `places`} 
            to stay in ${city.name}`}</b>

        <Sorting />

        <OfferList offers={offers} handleActivateElement= {handleActivateElement} />

      </section>
      <div className="cities__right-section">
        <section className="cities__map map">

          <MapCity offers={offers}
            city={city}
            activeOffer={activeItem}
          />

        </section>
      </div>
    </div>
  </div>;
};

export default MainBlockOffers;

