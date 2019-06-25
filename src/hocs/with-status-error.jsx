import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {getLoadError} from '../reducer/data/selectors.js';
import ErrorMessage from '../components/error-message/error-message.jsx';

const withStatusError = (Component) => {
  class WithStatusError extends PureComponent {
    constructor(props) {
      super(props);
    }

    render() {
      const {loadError} = this.props;
      if (loadError !== null) {
        return <ErrorMessage />;
      }
      return <Component {...this.props} />;
    }

  }
  WithStatusError.propTypes = {
    loadError: PropTypes.number
  };

  return WithStatusError;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  loadError: getLoadError(state)

});

export {withStatusError};
export default compose(connect(mapStateToProps, null), withStatusError);


