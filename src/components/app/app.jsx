import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import history from "../../history";
import {compose} from 'recompose';
import {Router, Switch, Route} from "react-router-dom";
import {Operation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import MainPage from '../main-page/main-page.jsx';
import Login from '../login-page/login-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import withStatusError from '../../hocs/with-status-error.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.saveUser();
    this.props.loadOffers();
  }

  render() {
    return <Router history={history}>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/favorites" component={FavoritesPage}/>
        <Route path="/offer/:id" component={OfferPage}/>
      </Switch>
    </Router>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: () => {
    dispatch(Operation.saveAuthorizationData());
  },

  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },
});

App.propTypes = {
  loadOffers: PropTypes.func,
  saveUser: PropTypes.func
};


export {App};
export default compose(
    connect(null, mapDispatchToProps),
    withStatusError
)(App);
