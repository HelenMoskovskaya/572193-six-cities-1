import {ActionCreator} from './reducer';

describe(`ActionCreator works correctly`, () => {
  it(`should return the correct value, when the city changes`, () => {
    expect(ActionCreator.changeCity(`Cologne`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Cologne`,
    });
  })
});
