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
    try {
      this._createMap();
    } catch (error) {
      return;
    }
  }

  componentDidUpdate() {
    this._updateMap()
  }

  _createMap() {
    const {offers} = this.props;

    this.map = leaflet.map(`map`, {
      center: [0,0],
      zoom: 12,
      zoomControl: false,
      layers: new leaflet.TileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    });

    this.markers = leaflet.layerGroup().addTo(this.map);
    this._addMarkers(offers, this.markers);
  }

  _addMarkers (offers, group) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    offers.map((offer) => {
      leaflet.marker([offer.location.latitude, offer.location.longitude], {icon}).addTo(group)
    })
  }

  _updateMap() {
    const {offers} = this.props;

    if (this.map) {
      this.map.setView([offers[0].city.location.latitude, offers[0].city.location.longitude], offers[0].city.location.zoom);
      this.markers.clearLayers();
      this._addMarkers(offers, this.markers);
    }
  }
}

MapCity.propTypes = {
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
  })).isRequired
};

export default MapCity
