import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from './main-page.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`CardTitle link correctly works`, () => {
  const clickHandler = jest.fn();
  const page = shallow(
      <MainPage
        cards={[{title: `Test`}]}
        onClick={clickHandler}
      />
  );

  page.find(`.place-card__name a`).simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
