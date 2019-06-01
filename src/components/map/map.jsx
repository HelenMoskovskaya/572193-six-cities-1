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
    const {offers} = this.props;
    try {
      this._createMap(offers);
    } catch (error) {
      return;
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  componentWillReceiveProps(nextProps) {
    const {offers} = this.props;
    if (this.props.offers !== nextProps.offers) {
      const {offers} = nextProps;
      this.map.remove();
      this._createMap(offers);
    }
  }

  _createMap(offers) {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const city = [52.38333, 4.9]
    const zoom = 12;

    this.map = leaflet.map(`map`, {
      center: city,
      zoom: zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
    .addTo(this.map);

    offers.forEach((offer) => {
      leaflet
      .marker([offer.location.latitude, offer.location.longitude], {icon})
      .addTo(this.map);
    });
  }
}



export default MapCity
