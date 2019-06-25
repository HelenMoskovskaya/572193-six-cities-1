import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {MarkerSize, MAP_HEIGHT} from '../../constans';
import {propTypesConstans} from '../../prop-types.js';


const SETTING_MAP = {
  zoomControl: false,
  marker: true,
  simpleIcon: leaflet.icon({
    iconUrl: `/img/pin.svg`,
    iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT]
  }),
  activeIcon: leaflet.icon({
    iconUrl: `/img/pin-active.svg`,
    iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT]
  })
};

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

  componentDidUpdate(prevProps) {
    const {offers, activeOffer, isZoomChange, city} = this.props;
    if (this.map && this.markersLayer && prevProps.activeOffer !== activeOffer) {
      const mapLocation = (activeOffer && isZoomChange) ? activeOffer.location : city.location;
      const zoomMap = (activeOffer && isZoomChange) ? activeOffer.location.zoom : city.location.zoom;

      this.markersLayer.clearLayers();
      this.map.flyTo([mapLocation.latitude, mapLocation.longitude], zoomMap);

      offers.map((offer) => {
        const icon = (activeOffer && activeOffer.id === offer.id) ? SETTING_MAP.activeIcon : SETTING_MAP.simpleIcon;
        leaflet
        .marker([offer.location.latitude, offer.location.longitude], {icon})
        .addTo(this.markersLayer);
      });
    }
  }

  _createMap() {
    const {offers, city, activeOffer} = this.props;

    const centerMap = [city.location.latitude, city.location.longitude];
    const zoomMap = city.location.zoom;

    this.map = leaflet.map(`map`, SETTING_MAP);
    this.map.setView(centerMap, zoomMap);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
        {attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 
          contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`})
          .addTo(this.map);

    this.markersLayer = leaflet.layerGroup().addTo(this.map);

    offers.map((offer) => {
      const icon = (activeOffer && activeOffer.id === offer.id) ? SETTING_MAP.activeIcon : SETTING_MAP.simpleIcon;
      leaflet
      .marker([offer.location.latitude, offer.location.longitude], {icon})
      .addTo(this.markersLayer);
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }
}

MapCity.propTypes = {
  offers: PropTypes.arrayOf(propTypesConstans.OFFER),
  city: propTypesConstans.CITY,
  activeOffer: propTypesConstans.OFFER,
  isZoomChange: PropTypes.bool
};

export default MapCity;
