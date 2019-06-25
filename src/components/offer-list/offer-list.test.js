import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OfferList from './offer-list.jsx';
import {mockOffers} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`OfferList`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <OfferList
          offers={mockOffers}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
