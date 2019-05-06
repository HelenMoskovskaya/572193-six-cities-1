import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';

const init = () => {
  const CardInfo = [
    {title: `Beautiful &amp; luxurious apartment at great location`},
    {title: `Wood and stone place`},
    {title: `Canal View Prinsengracht`},
    {title: `Nice, cozy, warm big bed apartment`}
  ];

  ReactDOM.render(
      <App cards={CardInfo}/>,
      document.querySelector(`#root`)
  );
};

init();
