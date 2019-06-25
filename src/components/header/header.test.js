import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import Header from './header.jsx';
import {userData} from '../../mocks/mocks.js';


describe(`Header`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter><Header
        isAuthorizationRequired={false}
        userData={userData}
      /></MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
