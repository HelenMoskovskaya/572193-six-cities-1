import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import CardOffer from "../offer-card/offer-card.jsx";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this._handleActivateCard = this._handleActivateCard.bind(this);

  }

  render() {
    const {offers} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, index) =>
        <CardOffer
          key={index}
          offer={offer}
          onActivate={this._handleActivateCard}
          onTitleClick={() => {}}
        />
      )}
    </div>;
  }

  _handleActivateCard(offer) {
    this.setState({activeCard: offer});
  }

}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default OfferList;
