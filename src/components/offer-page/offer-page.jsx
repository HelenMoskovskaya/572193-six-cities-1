import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation as ReviewsOperation} from '../../reducer/reviews/reviews';
import {getSortRewiews} from '../../reducer/reviews/selectors';
import {getLoadStatus, getOfferId, getNeighbourhoodOffers, getDetailsOffersForMap} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import Svg from '../svg/svg.jsx';
import Header from '../header/header.jsx';
import MapCity from '../map/map.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import PhotoGallery from '../photo-gallery/photo-gallery.jsx';
import DetailsInfo from '../details-info/details-info.jsx';
import HostInfo from '../host-info/host-info.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewsForm from '../reviews-form/reviews-form.jsx';
import {propTypesConstans} from '../../prop-types.js';


class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadReviews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }

    if (this.props.id !== prevProps.id) {
      this.props.loadReviews();
    }
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
                <ReviewsList reviews={reviews} key={offer.id}/>
                {isAuthorizationRequired ? <ReviewsForm id={offer.id} /> : null}

              </div>
            </div>
            <section className="property__map map">

              <MapCity offers={offers} city={offer.city}
                activeOffer={offer} changeZoom={true}/>

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <OfferList offers={neighbourhoodOffers} needLink={true}/>

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
    id,
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
    dispatch(ReviewsOperation.loadReviews(ownProps.match.params.id));
  },
});

OfferPage.propTypes = {
  offers: PropTypes.arrayOf(propTypesConstans.OFFER),
  offer: propTypesConstans.OFFER,
  isLoadOffers: PropTypes.bool.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: propTypesConstans.USER_DATA,
  loadReviews: PropTypes.func,
  neighbourhoodOffers: PropTypes.arrayOf(propTypesConstans.OFFER),
  reviews: PropTypes.arrayOf(propTypesConstans.REVIEW),
  location: PropTypes.object,
  id: PropTypes.string,
};

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
