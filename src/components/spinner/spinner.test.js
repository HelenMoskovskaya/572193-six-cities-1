import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import Spinner from './spinner.jsx';


describe(`Spinner`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <Spinner
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
