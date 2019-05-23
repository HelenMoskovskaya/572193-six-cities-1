import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class MapCity extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="map" style={{height: 800}}></div>;
  }

  componentDidMount() {
    const {offers, centerCoords, zoomMap} = this.props;
    try {
      this._createMap(offers, centerCoords, zoomMap);
    } catch (error) {
      return;
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.offers !== nextProps.offers) {
      const {offers, centerCoords, zoomMap} = nextProps;
      this.map.remove();
      this._createMap(offers, centerCoords, zoomMap);
    }
  }

  _createMap(offers, centerCoords, zoomMap) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.map = leaflet.map(`map`, {
      center: centerCoords,
      zoom: zoomMap,
      zoomControl: false,
      marker: true
    });

    this.map.setView(centerCoords, zoomMap);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    .addTo(this.map);

    offers.forEach((offer) => {
      leaflet
      .marker(offer.offerCoords, {icon})
      .addTo(this.map);
    });
  }
}

MapCity.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        offerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
  ).isRequired,
  centerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomMap: PropTypes.number.isRequired
};

export default MapCity;
