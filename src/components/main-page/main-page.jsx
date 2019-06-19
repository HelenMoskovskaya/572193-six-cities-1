import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import {connect} from 'react-redux';
import {getActiveCity, getCityList, getActiveOffers, getLoadStatus, newActiveCity} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {ActionCreatorData} from '../../reducer/data/data.js';
import withActiveItem from '../../hocs/with-active-item.jsx';
import MainBlockOffers from '../main-block-offers/main-block-offers.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers,
      cities,
      onCityClick,
      city,
      isAuthorizationRequired,
      userData,
      isLoadOffers} = this.props;

    const WrapOffersBlock = withActiveItem(MainBlockOffers);

    return <div className="page page--gray page--main">

      <Svg />
      <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>

      {isLoadOffers ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">
              Cities</h1>

          <CitiesList cities={cities} city={city} onCityClick={onCityClick}/>
          <WrapOffersBlock offers={offers} city={city} />

        </main>
        : <MainEmpty cities={cities} city={city} onCityClick={onCityClick}/>
      }
    </div>;
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
  handleActivateElement: PropTypes.func,
  activeItem: PropTypes.object
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
