import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {OfferPage} from './offer-page.jsx';
import {mockOffer, mockOffers, reviewsMock, userData} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`OfferPage`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <OfferPage
          offer={mockOffer}
          isLoadOffers={true}
          isAuthorizationRequired={false}
          userData={userData}
          neighbourhoodOffers={mockOffers}
          offers={mockOffers}
          reviews={reviewsMock}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
