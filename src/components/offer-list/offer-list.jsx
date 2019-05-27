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
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default withActiveItem(OfferList);
