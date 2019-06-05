import React from 'react';
import renderer from 'react-test-renderer';
import Svg from './svg.jsx';

it(`App correcrly renders`, () => {
  const tree = renderer

  .create(<Svg
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
