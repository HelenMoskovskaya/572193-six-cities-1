import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {compose} from "redux";
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../reducer/user/selectors';


const withPrivateRoute = (Component) => {
  return function WithPropsAuth(props) {
    const propTypes = {
      isAuthorizationRequired: PropTypes.bool.isRequired
    };
    WithPropsAuth.propTypes = propTypes;

    return ((props.isAuthorizationRequired) ? <Redirect to="/login"/> : <Component {...props}/>);
  };
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const composedComponentWrap = compose(
    connect(mapStateToProps, null),
    withPrivateRoute
);

export {withPrivateRoute};
export default composedComponentWrap;
