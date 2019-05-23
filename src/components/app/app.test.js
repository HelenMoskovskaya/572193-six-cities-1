import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app';

const mockAllOffers = [
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.83832557, 2.29878187],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.86905515, 2.36973166],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
  {
    city: `Cologne`,
    centerCityCoords: [50.938361, 6.959974],
    offerCoords: [50.92812784, 6.9745481],
    title: `Nice, cozy, warm big bed apartment`,
    type: `Apartment`,
    image: `img/apartment-03.jpg`,
    price: 180,
    rating: 100,
    isPremium: true,
  },
]

const mockOffers = [
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.83832557, 2.29878187],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.86905515, 2.36973166],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
]

it(`App correcrly renders`, () => {
  const tree = renderer
    .create(<App
      allOffers={mockAllOffers}
      offers={mockOffers}
      onCityClick={jest.fn()}
      city={`Paris`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
