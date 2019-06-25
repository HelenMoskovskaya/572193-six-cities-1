import React from 'react';
import PropTypes from 'prop-types';
import {MAIN_URL} from '../../constans.js';
import {Link} from 'react-router-dom';
import {propTypesConstans} from '../../prop-types.js';

const Header = (props) => {
  const {isAuthorizationRequired, userData} = props;
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link to= {isAuthorizationRequired ? `/favorites` : `/login`}
                className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img className="user__avatar"
                    src={isAuthorizationRequired ? `${MAIN_URL}${userData.avatarUrl}` : ``}/>
                </div>
                <span className="header__login">
                  {isAuthorizationRequired ? userData.email : `Sign in`}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};


Header.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: propTypesConstans.USER_DATA,
};

export default Header;
