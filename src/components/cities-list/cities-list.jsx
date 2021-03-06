import React from 'react';
import PropTypes from 'prop-types';
import {propTypesConstans} from '../../prop-types.js';

const CitiesList = (props) => {
  const {cities, city, onCityClick} = props;

  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((it) =>
          <li className="locations__item" key={`city-${it}`}>
            <a className={`locations__item-link tabs__item
            ${it === city.name ? `tabs__item--active` : ``}`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityClick(it);
            }}>
              <span>{it}</span>
            </a>
          </li>
        )}
      </ul>
    </section>
  </div>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: propTypesConstans.CITY,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
