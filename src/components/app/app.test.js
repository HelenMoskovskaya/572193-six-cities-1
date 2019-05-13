import React from "react";
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mockOffer = [
  {
    title: `Test`,
    type: `Test`,
    image: `img/test-01.jpg`,
    price: 30,
    rating: 39,
    isPremium: false,
  },
  {
    title: `Test`,
    type: `Test`,
    image: `img/test-02.jpg`,
    price: 320,
    rating: 89,
    isPremium: false,
  },
  {
    title: `Test`,
    type: `Room`,
    image: `img/test-03.jpg`,
    price: 620,
    rating: 100,
    isPremium: true,
  }
];

it(`App correcrly renders`, () => {
  const tree = renderer
    .create(<App
      offers={mockOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
