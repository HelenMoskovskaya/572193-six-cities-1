import React from 'react';
import MainPage from '../main-page/main-page.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/data/data.js';
import {getOffers, getActiveCity, getCityList, getActiveOffers} from '../../reducer/data/selectors.js';

const App = (props) => {
  const {allOffers, offers, city, onCityClick} = props;


  return <MainPage
    offers = {offers}
    onCityClick={onCityClick}
    city={city}
  />;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getActiveCity(state),
  offers: getActiveOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreator.changeCity(activeCity));
  }
});

App.propTypes = {
  allOffers: PropTypes.arrayOf(PropTypes.PropTypes.shape({
    city: PropTypes.string.isRequired,
    centerCityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    offerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired
  })).isRequired,
  offers: PropTypes.arrayOf(PropTypes.PropTypes.shape({
    city: PropTypes.string.isRequired,
    centerCityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    offerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired
  })).isRequired,
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
