import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {App} from './app.jsx';


const renderer = new ShallowRenderer();

describe(`App`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <App
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
