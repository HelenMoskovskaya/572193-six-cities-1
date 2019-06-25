import React from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';


const FavoriteList = (props) => {
  const {favorites} = props;
  return <ul className="favorites__list">
    {Object.entries(favorites).map(([key, value]) => (
      <li key={key} className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{key}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">

          <OfferList offers={value}
            className="favorites__places"
            favoriteClass={true}
            small={true}
            needLink={true}/>

        </div>
      </li>
    ))}
  </ul>;
};

FavoriteList.propTypes = {
  favorites: PropTypes.object.isRequired
};

export default FavoriteList;
