import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import FavoritesEmpty from './favorites-empty.jsx';


describe(`v`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <FavoritesEmpty
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
