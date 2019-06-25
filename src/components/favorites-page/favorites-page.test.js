import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {FavoritesPage} from './favorites-page.jsx';
import {mockOffers, mockFavorites, userData} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`FavoritesPage`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <FavoritesPage
          isAuthorizationRequired={true}
          userData={userData}
          favorites={mockOffers}
          offersByCity={mockFavorites}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
