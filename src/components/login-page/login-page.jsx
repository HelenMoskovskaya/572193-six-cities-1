import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import Header from '../header/header.jsx';
import Svg from '../svg/svg.jsx';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation} from '../../reducer/user/user';
import {compose} from 'recompose';
import withAuthorization from '../../hocs/with-authorization.jsx';


const Login = (props) => {
  const {loginUser, isAuthorizationRequired, userData, form, onFormChange} = props;

  if (isAuthorizationRequired) {
    return <Redirect to="/" />;
  }
  return <div className="page page--gray page--login">

    <Svg />
    <Header isAuthorizationRequired = {isAuthorizationRequired} userData = {userData}/>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={(evt) => {
              evt.preventDefault();
              loginUser(form);
            }}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                onChange={onFormChange}
                value={form.email}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                onChange={onFormChange}
                value={form.password}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button
              className="login__submit form__submit button"
              type="submit">Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: getAuthorizationStatus(state),
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (form) => {
    dispatch(Operation.authorizeUser(form));
  },
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.object,
  form: PropTypes.object,
};

export {Login};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthorization
)(Login);

