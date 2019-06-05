import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

const mockUserData = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  avatar_url: `img/1.png`,
  is_pro: false
};

it(`App correcrly renders`, () => {
  const tree = renderer

  .create(<Header
    isAuthorizationRequired={true}
    userData={mockUserData}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
