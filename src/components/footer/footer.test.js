import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import Footer from './footer.jsx';


describe(`Footer`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <Footer
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
