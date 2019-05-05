import React from "react";
import MainPage from './main-page.jsx';
import PropTypes from "prop-types";

const App = (props) => {
  const {cards} = props;
  return <MainPage
    cards = {cards}
  />;
};

App.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
