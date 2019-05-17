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
    this._createMap();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  _createMap() {
    const {offers} = this.props;
    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoomCity = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom: zoomCity,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoomCity);

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
};

export default Map;
