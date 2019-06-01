import React from 'react';
import MainPage from '../main-page/main-page.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data.js';
import {getOffers, getActiveCity, getCityList, getActiveOffers} from '../../reducer/data/selectors.js';

const App = (props) => {
  const {offers, city, onCityClick, cities} = props;

  return <MainPage
    offers = {offers}
    cities = {cities}
    onCityClick={onCityClick}
    city={city}
  />;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getActiveCity(state),
  offers: getActiveOffers(state),
  cities: getCityList(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreator.changeCity(activeCity));
  }
});

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.PropTypes.shape({
    type: PropTypes.string.isRequired,
    preview_image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    is_premium: PropTypes.bool.isRequired
  })).isRequired,
  onCityClick: PropTypes.func.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
