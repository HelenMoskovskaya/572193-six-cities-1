import React from "react";
import renderer from 'react-test-renderer';
import CardOffer from './offer-card.jsx';

const mockOffer = {
  title: `Test`,
  type: `Room`,
  image: `img/test-01.jpg`,
  price: 320,
  rating: 89,
  isPremium: false,
}

it(`CardOffer correcrly renders`, () => {
  const tree = renderer
    .create(<CardOffer
      offer={mockOffer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
