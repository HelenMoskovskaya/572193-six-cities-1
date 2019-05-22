import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="map" style={{height: 800, margin: `25px 0 25px 0`}}></div>;
  }

  componentDidMount() {
    const {offers, centerCoords, zoomMap} = this.props;
    this._createMap(offers, centerCoords, zoomMap);
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

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        offerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
  ).isRequired,
  centerCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomMap: PropTypes.number.isRequired
};

export default Map;
