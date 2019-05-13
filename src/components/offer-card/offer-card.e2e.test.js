import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardOffer from './offer-card.jsx';

configure({adapter: new Adapter()});

const mockOffer = {
  title: `Test`,
  type: `Room`,
  image: `img/test-01.jpg`,
  price: 320,
  rating: 89,
  isPremium: false,
}

it(`Click on the image correctly works`, () => {
  const onActivate = jest.fn();
  const app = mount(<CardOffer offer={mockOffer} onActivate={onActivate}/>);
  const imgLink = app.find(`.place-card__image-wrapper a`);

  imgLink.simulate(`click`, {preventDefault() { }});

  expect(onActivate).toHaveBeenCalledTimes(1);
});

it(`Mouseover on the cards correctly works`, () => {
  const onActivate = jest.fn();
  const app = mount(<CardOffer offer={mockOffer} onActivate={onActivate}/>);
  const img = app.find(`.place-card__image-wrapper`);

  img.simulate(`mouseover`);

  expect(onActivate).toHaveBeenCalledTimes(1);
});

it(`Click on the title correctly works`, () => {
  const onTitleClick = jest.fn();
  const app = mount(<CardOffer offer={mockOffer} onTitleClick={onTitleClick}/>);
  const titleLink = app.find(`.place-card__name a`);

  titleLink.simulate(`click`, {preventDefault() { }});

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
