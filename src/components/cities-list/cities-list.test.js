import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import CitiesList from './cities-list.jsx';
import {cities, cityMock} from '../../mocks/mocks.js';


describe(`CitiesList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MemoryRouter><CitiesList
        cities={cities}
        city={cityMock}
        onCityClick={jest.fn()}
      /></MemoryRouter>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
