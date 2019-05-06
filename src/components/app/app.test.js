import React from "react";
import renderer from 'react-test-renderer';
import App from './app.jsx';

it(`App correcrly renders`, () => {
  const tree = renderer
    .create(<App
      cards={[]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
