import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Sorting} from './sorting.jsx';


describe(`Sorting`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <Sorting
          isMenuOpen={true}
          changeToggle={jest.fn()}
          activeSort={`Popular`}
          sortOffers={jest.fn()}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
