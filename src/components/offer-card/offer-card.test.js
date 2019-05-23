import React from 'react';
import renderer from 'react-test-renderer';
import CardOffer from './offer-card.jsx';

const mockOffer = {
  city: `Paris`,
  centerCityCoords: [48.85881005, 2.32003101],
  offerCoords: [48.83832557, 2.29878187],
  title: `Wood and stone place`,
  type: `Private room`,
  image: `img/room.jpg`,
  price: 80,
  rating: 80,
  isPremium: false,
}

it(`CardOffer correcrly renders`, () => {
  const tree = renderer
    .create(<CardOffer
      offer={mockOffer}
      onActivate={jest.fn()}
      onTitleClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
