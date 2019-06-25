import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {MainPage} from './main-page.jsx';
import {mockOffers, mockOffer, cityMock, cities, userData} from '../../mocks/mocks.js';


const renderer = new ShallowRenderer();

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    renderer.render(
        <MainPage
          offers={mockOffers}
          cities={cities}
          onCityClick={jest.fn()}
          city={cityMock}
          isAuthorizationRequired={true}
          userData={userData}
          isLoadOffers={true}
          activeItem={mockOffer}
        />
    );
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
