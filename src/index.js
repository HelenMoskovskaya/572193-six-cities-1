import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';

import cardsOffer from './mocks/offers.js';

const init = (cardsOffer) => {
  ReactDOM.render(
      <App offers={cardsOffer}/>,
      document.querySelector(`#root`)
  );
};

init(cardsOffer);
