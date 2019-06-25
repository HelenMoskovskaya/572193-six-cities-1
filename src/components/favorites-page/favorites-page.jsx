import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Operation} from '../../reducer/data/data.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {getFavorites, getOffersByCity} from '../../reducer/data/selectors.js';
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import FavoriteList from '../favorite-list/favorite-list.jsx';
import Footer from '../footer/footer.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import {propTypesConstans} from '../../prop-types.js';


class FavoritesPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavorites();
  }

  componentDidUpdate() {

  }
  render() {
    const {isAuthorizationRequired, userData, favorites, offersByCity} = this.props;

    if (!isAuthorizationRequired) {
      return <Link to="/login" />;
    }

    return <div>
      <Svg />
      <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>
      {(favorites.length > 0) ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList favorites={offersByCity} favoriteClass={true} />
            </section>
          </div>
        </main> : <FavoritesEmpty />}
      <Footer />
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state),
  userData: getUserData(state),
  favorites: getFavorites(state),
  offersByCity: getOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => {
    dispatch(Operation.loadFavorites());
  },
});


FavoritesPage.propTypes = {
  loadFavorites: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: propTypesConstans.USER_DATA,
  offersByCity: PropTypes.object.isRequired,
  favorites: PropTypes.arrayOf(propTypesConstans.OFFER),
};

export {FavoritesPage};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
