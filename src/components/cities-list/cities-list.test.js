import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';

const citiesMock = [`Paris`, `Cologne`]

it(`CitiesList correcrly renders`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={citiesMock}
      city={`Cologne`}
      onCityClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
