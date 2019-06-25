import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MainEmpty from './main-empty.jsx';
import {cities, cityMock} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`MainEmpty`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <MainEmpty
          city={cityMock}
          cities={cities}
          onCityClick={jest.fn()}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
