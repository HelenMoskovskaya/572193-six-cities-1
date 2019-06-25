import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import ErrorMessage from './error-message.jsx';


describe(`ErrorMessage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <ErrorMessage
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
