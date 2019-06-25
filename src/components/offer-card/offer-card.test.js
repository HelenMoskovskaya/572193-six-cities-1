import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {CardOffer} from './offer-card.jsx';
import {mockOffer} from '../../mocks/mocks.js';


describe(`CardOffer`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter><CardOffer
        offer={mockOffer}
        needLink={false}
        favoriteClass={false}
        changeFavorites={jest.fn()}
        small={false}
        checkActiveOffer={jest.fn()}
      /></MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
