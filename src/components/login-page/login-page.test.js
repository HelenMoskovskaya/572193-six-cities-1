import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Login} from './login-page.jsx';
import {userData} from '../../mocks/mocks.js';

describe(`Login`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter><Login
        loginUser={jest.fn()}
        isAuthorizationRequired={false}
        userData={userData}
        form={{}}
        onFormChange={jest.fn()}
      /></MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
