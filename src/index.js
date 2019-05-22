import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';

import cardsOffer from './mocks/offers.js';
import {reducer} from './reducer.js';

const init = (cardsOffer) => {
  const store = createStore(reducer);

  ReactDOM.render(
    <Provider store={store}>
      <App allOffers={cardsOffer}/>
    </Provider>,
    document.querySelector(`#root`)
  );
};

init(cardsOffer);
