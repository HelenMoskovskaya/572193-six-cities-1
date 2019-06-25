import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import PhotoGallery from './photo-gallery.jsx';
import {mockOffer} from '../../mocks/mocks.js';


describe(`PhotoGallery`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <PhotoGallery
          offer={mockOffer}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
