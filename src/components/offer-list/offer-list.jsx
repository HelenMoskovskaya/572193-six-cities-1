import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import CardOffer from '../offer-card/offer-card.jsx';
import withActiveItem from '../../hocs/with-active-item.jsx';


const OfferList = (props) => {
  const {offers, handleActivateElement} = props;

  return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, index) =>
        <CardOffer
          key={index}
          offer={offer}
          onActivateElement={handleActivateElement}
          onTitleClick={() => {}}
        />
      )}
    </div>;
}


OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.shape ({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
      })
    }),
    preview_image: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    title: PropTypes.string.isRequired,
    is_favorite: PropTypes.bool.isRequired,
    is_premium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    max_adults: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      is_pro: PropTypes.bool.isRequired,
      avatar_url: PropTypes.string.isRequired
    }),
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }),
    id: PropTypes.number.isRequired
  })).isRequired,

  handleActivateElement: PropTypes.func.isRequired
};


export default withActiveItem(OfferList);
