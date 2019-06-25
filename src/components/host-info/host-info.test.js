import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import HostInfo from './host-info.jsx';
import {mockOffer} from '../../mocks/mocks.js';


describe(`HostInfo`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter>
        <HostInfo
          offer={mockOffer}
        />
      </MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
