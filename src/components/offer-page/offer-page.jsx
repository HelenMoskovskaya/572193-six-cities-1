import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Svg from '../svg/svg.jsx';
import Header from '../header/header.jsx';
import {connect} from 'react-redux';
import {Operation as DataOperation} from '../../reducer/data/data';
import {getLoadStatus, getOfferId, getNeighbourhoodOffers,
  getDetailsOffersForMap, getSortRewiews} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import MapCity from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import PhotoGallery from '../photo-gallery/photo-gallery.jsx';
import DetailsInfo from '../details-info/details-info.jsx';
import HostInfo from '../host-info/host-info.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadReviews();
  }

  render() {
    const {offer, isLoadOffers, isAuthorizationRequired,
      userData, neighbourhoodOffers, offers, reviews} = this.props;
    if (isLoadOffers) {
      return <div className="page">
        <Svg />
        <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>
        <main className="page__main page__main--property">
          <section className="property">

            <PhotoGallery offer={offer} />

            <div className="property__container container">
              <div className="property__wrapper">

                <DetailsInfo offer={offer} />
                <HostInfo offer={offer} />
                <ReviewsList reviews={reviews}/>

              </div>
            </div>
            <section className="property__map map">

              <MapCity offers={offers} city={offer.city} activeOffer={offer}/>

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <OfferList offers={neighbourhoodOffers} handleActivateElement={() => null}/>

              </div>
            </section>
          </div>
        </main>
      </div>;
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return Object.assign({}, ownProps, {
    isLoadOffers: getLoadStatus(state),
    offer: getOfferId(state, id),
    offers: getDetailsOffersForMap(state, id),
    isAuthorizationRequired: getAuthorizationStatus(state),
    userData: getUserData(state),
    neighbourhoodOffers: getNeighbourhoodOffers(state, id),
    reviews: getSortRewiews(state),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadReviews: () => {
    dispatch(DataOperation.loadReviews(ownProps.match.params.id));
  },
});

OfferPage.propTypes = {
  offer: PropTypes.shape({
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
  }),
  isLoadOffers: PropTypes.bool.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string
  }),
};

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
