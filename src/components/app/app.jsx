import React from 'react';
import MainPage from '../main-page/main-page.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreatorData} from '../../reducer/data/data.js';
import {getActiveCity, getCityList, getActiveOffers, getLoadStatus} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import {Switch, Route} from "react-router-dom";
import withPrivateRoute from '../../hocs/with-private-route.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorites/favorites.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers,
      city,
      onCityClick,
      cities,
      isAuthorizationRequired,
      loginUser,
      userData,
      isLoadOffers} = this.props;

    if (isLoadOffers) {
      return <React.Fragment>
        <Svg />
        <Header
          isAuthorizationRequired = {isAuthorizationRequired}
          userData = {userData}/>
        <Switch>
          <Route path="/" exact render={() =>
            <MainPage offers = {offers} cities = {cities} onCityClick={onCityClick} city={city} />}
          />
          <Route path="/login" exact render={() =>
            <SignIn loginUser={loginUser} isAuthorizationRequired={isAuthorizationRequired}/>}/>
          <Route path="/favorites" component={Favorites}/>
        </Switch>
      </React.Fragment>;
    }

    return null;
  }

  componentDidMount() {
    this.props.saveUser();
    this.props.loadOffers();
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: getActiveCity(state),
  offers: getActiveOffers(state),
  cities: getCityList(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
  userData: getUserData(state),
  isLoadOffers: getLoadStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (activeCity) => {
    dispatch(ActionCreatorData.changeCity(activeCity));
  },

  loginUser: (email, password) => {
    dispatch(Operation.authorizeUser(email, password));
  },

  saveUser: () => {
    dispatch(Operation.saveAuthorizationData());
  },

  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },

});

App.propTypes = {
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

  city: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCityClick: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  userData: PropTypes.object,
  saveUser: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
  isLoadOffers: PropTypes.bool.isRequired
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
