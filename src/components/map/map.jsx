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
    try {
      this._createMap();
    } catch (error) {
      return;
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _createMap() {
    const {offers, city, zoomMap} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const map = leaflet.map(`map`, {
      center: city,
      zoom: zoomMap,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoomMap);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    .addTo(map);

    offers.map((offer) => {
      leaflet
      .marker(offer.coords, {icon})
      .addTo(map);
    });
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
  ).isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomMap: PropTypes.number.isRequired
};

export default Map;
