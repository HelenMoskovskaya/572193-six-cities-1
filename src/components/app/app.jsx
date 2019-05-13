import React from "react";
import MainPage from '../main-page/main-page.jsx';
import PropTypes from "prop-types";

const App = (props) => {
  const {offers} = props;
  return <MainPage
    offers = {offers}
  />;
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
