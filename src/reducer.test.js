import {reducer, ActionCreator} from './reducer';
import offersMock from './mocks/offers';


const mockOffer = [
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.83832557, 2.29878187],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
  {
    city: `Paris`,
    centerCityCoords: [48.85881005, 2.32003101],
    offerCoords: [48.86905515, 2.36973166],
    title: `Wood and stone place`,
    type: `Private room`,
    image: `img/room.jpg`,
    price: 80,
    rating: 80,
    isPremium: false,
  },
  {
    city: `Cologne`,
    centerCityCoords: [50.938361, 6.959974],
    offerCoords: [50.92812784, 6.9745481],
    title: `Nice, cozy, warm big bed apartment`,
    type: `Apartment`,
    image: `img/apartment-03.jpg`,
    price: 180,
    rating: 100,
    isPremium: true,
  },
]

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: ``,
      offers: mockOffer.filter((it) => it.city === mockOffer[0].city)
    });
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`should return the correct value, when the city changes`, () => {
    expect(ActionCreator.changeCity(`Cologne`)).toEqual({
      type: `CHANGE_CITY`,
      payload: `Cologne`,
    });
  })

  it(`should return the offersList for selected city`, () => {
    expect(ActionCreator.getOffers(`Paris`, mockOffer)).toEqual({
      type: `GET_OFFERS`,
      payload: [
        {
          city: `Paris`,
          centerCityCoords: [48.85881005, 2.32003101],
          offerCoords: [48.83832557, 2.29878187],
          title: `Wood and stone place`,
          type: `Private room`,
          image: `img/room.jpg`,
          price: 80,
          rating: 80,
          isPremium: false,
        },
        {
          city: `Paris`,
          centerCityCoords: [48.85881005, 2.32003101],
          offerCoords: [48.86905515, 2.36973166],
          title: `Wood and stone place`,
          type: `Private room`,
          image: `img/room.jpg`,
          price: 80,
          rating: 80,
          isPremium: false,
        },
      ]
    });
  })
});
