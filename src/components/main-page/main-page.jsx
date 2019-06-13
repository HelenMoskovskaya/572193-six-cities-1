import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import OfferList from '../offer-list/offer-list.jsx';
import MapCity from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import {connect} from 'react-redux';
import {getActiveCity, getCityList, getActiveOffers, getLoadStatus} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {ActionCreatorData} from '../../reducer/data/data.js';
import withActiveItem from '../../hocs/with-active-item.jsx';
import {compose} from 'recompose';


class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, cities, onCityClick, city, isAuthorizationRequired, userData, isLoadOffers, handleActivateElement, activeItem} = this.props;
    if (isLoadOffers) {
      return <div className="page page--gray page--main">

        <Svg />
        <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">
            Cities</h1>

          <CitiesList cities={cities} city={city} onCityClick={(activeCity) => {
            onCityClick(activeCity);
            handleActivateElement(null);
          }}/>

          <div className="cities__places-wrapper">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offers.length} ${offers.length === 1 ? `place` : `places`} 
                to stay in ${city.name}`}</b>
                <OfferList offers={offers} handleActivateElement= {handleActivateElement}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">

                  <MapCity offers={offers}
                    city={city}
                    activeOffer={activeItem}/>

                </section>
              </div>
            </div>
          </div>
        </main>
      </div>;
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getActiveCity(state),
  offers: getActiveOffers(state),
  cities: getCityList(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  userData: getUserData(state),
  isLoadOffers: getLoadStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreatorData.changeCity(activeCity));
  },
});


MainPage.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,

  city: PropTypes.object.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  isLoadOffers: PropTypes.bool.isRequired,
  handleActivateElement: PropTypes.func.isRequired,
  activeItem: PropTypes.object
};

export {MainPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withActiveItem
)(MainPage);
