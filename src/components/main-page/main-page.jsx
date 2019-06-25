import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreatorData} from '../../reducer/data/data.js';
import {getActiveCity, getCityList, getActiveOffers, getLoadStatus,
  getActiveItem, getLoadError} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import CitiesList from '../cities-list/cities-list.jsx';
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import MapCity from '../map/map.jsx';
import Sorting from '../sorting/sorting.jsx';
import Spinner from '../spinner/spinner.jsx';
import {propTypesConstans} from '../../prop-types.js';


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
      isLoadOffers,
      activeItem} = this.props;

    if (!isLoadOffers) {
      return <Spinner />;
    }

    return <div className="page page--gray page--main">
      <Svg />
      <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>

      {offers && offers.length ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">
              Cities</h1>

          <CitiesList cities={cities} city={city} onCityClick={onCityClick } />

          <div className="cities__places-wrapper">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${offers.length} ${offers.length === 1 ? `place` : `places`} 
            to stay in ${city.name}`}</b>

                <Sorting />
                <OfferList offers={offers} />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">

                  <MapCity offers={offers}
                    city={city}
                    activeOffer={activeItem}
                    key={city.name}
                    isZoomChange={true}
                  />

                </section>
              </div>
            </div>
          </div>;
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
  activeItem: getActiveItem(state),
  loadError: getLoadError(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreatorData.changeCity(activeCity));
  },

  checkActiveOffer: (offer) => {
    dispatch(ActionCreatorData.checkActiveOffer(offer));
  },
});


MainPage.propTypes = {
  offers: PropTypes.arrayOf(propTypesConstans.OFFER),
  city: propTypesConstans.CITY,
  cities: PropTypes.arrayOf(PropTypes.string),
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: propTypesConstans.USER_DATA,
  isLoadOffers: PropTypes.bool.isRequired,
  handleActivateElement: PropTypes.func,
  activeItem: propTypesConstans.OFFER
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
