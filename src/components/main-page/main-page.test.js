import React from "react";
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

const mockOffer = [
  {
    coords: [52.3909553943508, 4.85309666406198],
    title: `Test`,
    type: `Test`,
    image: `img/test-01.jpg`,
    price: 30,
    rating: 39,
    isPremium: false,
  },
  {
    coords: [52.369553943508, 4.85309666406198],
    title: `Test`,
    type: `Test`,
    image: `img/test-02.jpg`,
    price: 320,
    rating: 89,
    isPremium: false,
  },
  {
    coords: [52.3909553943508, 4.929309666406198],
    title: `Test`,
    type: `Room`,
    image: `img/test-03.jpg`,
    price: 620,
    rating: 100,
    isPremium: true,
  }
]

it(`MainPage correcrly renders`, () => {
  const tree = renderer
    .create(<MainPage
      offers={mockOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
