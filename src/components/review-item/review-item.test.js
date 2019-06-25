import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import ReviewItem from './review-item.jsx';
import {reviewItemMock} from '../../mocks/mocks.js';


describe(`ReviewItem`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <ReviewItem
          review={reviewItemMock}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
