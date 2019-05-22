import React from "react";
import MainPage from '../main-page/main-page.jsx';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';


const App = (props) => {
  const {allOffers, offers, city, onCityClick} = props;

  const cities = [...new Set(allOffers.map((it) => it.city))].slice(0, 6);

  return <MainPage
    offers = {offers}
    cities = {cities}
    onCityClick={(activeCity) => onCityClick(activeCity, allOffers)}
    city={city ? city : cities[0]}
  />;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offers: state.offers
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity, allOffers) => {
    dispatch(ActionCreator.changeCity(activeCity));
    dispatch(ActionCreator.getOffers(activeCity, allOffers));

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
