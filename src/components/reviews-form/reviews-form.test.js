import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {ReviewsForm} from './reviews-form.jsx';

describe(`ReviewsForm`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <ReviewsForm
          disabled={true}
          onFormChange={jest.fn()}
          form={{}}
          postReview={jest.fn()}
          id={4}
          error={{}}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
