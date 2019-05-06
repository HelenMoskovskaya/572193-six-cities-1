import React from "react";
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

it(`MainPage correcrly renders`, () => {
  const tree = renderer
    .create(<MainPage
      cards={[]}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
