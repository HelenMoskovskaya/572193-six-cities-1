import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FavoriteList from './favorite-list.jsx';
import {mockFavorites} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`FavoriteList`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <FavoriteList
          favorites={mockFavorites}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
