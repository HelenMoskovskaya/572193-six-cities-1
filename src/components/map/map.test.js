import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';

const mockOffers = [{
  "city": {
    "name": `Paris`,
    "location": {
      "latitude": 52.37454,
      "longitude": 4.897976,
      "zoom": 13
    }
  },
  "previewImage": `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
  "images": [
    `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`
  ],
  "title": `Amazing and Extremely Central Flat`,
  "isFavorite": true,
  "isPremium": false,
  "rating": 3.0,
  "type": `apartment`,
  "bedrooms": 4,
  "maxAdults": 8,
  "price": 569,
  "goods": [
    `Air conditioning`,
    `Washer`,
    `Laptop friendly workspace`,
    `Breakfast`,
    `Baby seat`
  ],
  "host": {
    "id": 90,
    "name": `Laura`,
    "isPro": true,
    "avatarUrl": `img/avatar-angelina.jpg`
  },
  "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
  "location": {
    "latitude": 52.37154,
    "longitude": 4.889976,
    "zoom": 16
  },
  "id": 1
},
{
  "city": {
    "name": `Paris`,
    "location": {
      "latitude": 52.37454,
      "longitude": 4.897976,
      "zoom": 13
    }
  },
  "previewImage": `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
  "images": [
    `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
    `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`
  ],
  "title": `Amazing and Extremely Central Flat`,
  "isFavorite": true,
  "isPremium": false,
  "rating": 3.0,
  "type": `apartment`,
  "bedrooms": 4,
  "maxAdults": 8,
  "price": 569,
  "goods": [
    `Air conditioning`,
    `Washer`,
    `Laptop friendly workspace`,
    `Breakfast`,
    `Baby seat`
  ],
  "host": {
    "id": 90,
    "name": `Laura`,
    "isPro": true,
    "avatarUrl": `img/avatar-angelina.jpg`
  },
  "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
  "location": {
    "latitude": 52.37154,
    "longitude": 4.889976,
    "zoom": 16
  },
  "id": 1
}
];

const testLeaflet = () => {
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  global.document.body.appendChild(div)
}

const city = [52.38333, 4.9];
const zoomMap = 14;

it(`Map correcrly renders`, () => {
  const tree = renderer

    .create(<Map
      offers={mockOffers}
      leaflet={testLeaflet}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
