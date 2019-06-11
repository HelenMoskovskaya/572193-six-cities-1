import React from 'react';
import MainPage from '../main-page/main-page.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import withPrivateRoute from '../../hocs/with-private-route.jsx';
import Login from '../login-page/login-page.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.saveUser();
    this.props.loadOffers();
  }

  render() {
    return <Router>
      <Switch>
        <Route path="/" exact component={MainPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/favorites" component={FavoritesPage}/>
        <Route path="/offer/:id" component={OfferPage}/>
      </Switch>
    </Router>;
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
});

const mapDispatchToProps = (dispatch) => ({
  saveUser: () => {
    dispatch(Operation.saveAuthorizationData());
  },

  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },

});

App.propTypes = {
  loadOffers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
