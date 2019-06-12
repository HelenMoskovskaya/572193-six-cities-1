import React, {PureComponent} from 'react';
import {Redirect} from 'react-router-dom';


const withPrivateRoute = (Component, isProperty, URL) => {
  class WithPrivateRoute extends PureComponent {
    constructor(props) {
      super(props);
    }
    render() {
      if (isProperty) {
        return <Component {...this.props}/>;
      } else {
        return <Redirect to={URL}/>;
      }
    }
  }

  WithPrivateRoute.displayName = `WithPrivateRoute(${Component.displayName || Component.name || `Component`})`;

  return WithPrivateRoute;
};

export default withPrivateRoute;

