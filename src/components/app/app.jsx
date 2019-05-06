import React from "react";
import MainPage from '../main-page/main-page.jsx';
import PropTypes from "prop-types";

const App = (props) => {
  const {cards} = props;
  return <MainPage
    cards = {cards}
  />;
};

App.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired
};

export default App;

