import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {MarkerSize, MAP_HEIGHT} from '../../constans';

const SETTNG_MAP = {
  zoomControl: false,
  marker: true,
  icon: leaflet.icon({
    iconUrl: `/img/pin.svg`,
    iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT]
  })
};

const activeIcon = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT]
});

class MapCity extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="map" style={{height: MAP_HEIGHT}}></div>;
  }

  componentDidMount() {
    try {
      this._createMap();
    } catch (error) {
      return;
    }
  }

  componentDidUpdate() {
    this._updateMap();
  }

  _createMap() {
    const {offers, city, activeOffer} = this.props;
    this.map = leaflet.map(`map`, SETTNG_MAP);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`})
          .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);
    this._setMapView(activeOffer, city);
    this._addMarkers(offers, activeOffer);
  }

  _addMarkers(offers, activeOffer) {
    for (const offer of offers) {
      const icon = (activeOffer && activeOffer.id === offer.id) ? activeIcon : SETTNG_MAP.icon;
      const location = [offer.location.latitude, offer.location.longitude];
      leaflet.marker(location, {icon}).addTo(this.markersLayer);
    }
  }

  _setMapView(activeOffer, city) {
    const Maplocation = activeOffer ? activeOffer.location : city.location;
    this.map.setView([Maplocation.latitude, Maplocation.longitude], Maplocation.zoom);
  }

  _updateMap() {
    const {offers, city, activeOffer} = this.props;
    if (this.map) {
      this._setMapView(activeOffer, city);
      this.markersLayer.clearLayers();
      this._addMarkers(offers, activeOffer);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }
}

MapCity.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  city: PropTypes.object,
  activeOffer: PropTypes.object
};

export default MapCity;
