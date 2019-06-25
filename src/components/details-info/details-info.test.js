import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {DetailsInfo} from './details-info.jsx';
import {mockOffer} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`DetailsInfo`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <DetailsInfo
          offer={mockOffer}
          changeFavorites={jest.fn()}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
