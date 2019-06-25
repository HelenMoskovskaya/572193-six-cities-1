import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReviewsList from './reviews-list.jsx';
import {reviewsMock} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`ReviewsList`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <ReviewsList
          reviews={reviewsMock}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
