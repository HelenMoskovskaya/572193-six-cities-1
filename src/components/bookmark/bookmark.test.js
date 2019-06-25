import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import BookMark from './bookmark.jsx';


describe(`BookMark`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <BookMark
          changeFavorites={jest.fn()}
          isFavorite={true}
          small={false}
          className={``}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
