import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAuthorization = (Component) => {
  class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._handleActivateElement = this._handleActivateElement.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        handleActivateElement = {this._handleActivateElement}
        activeItem = {this.state.activeItem}
      />;
    }

    _handleActivateElement(activeItem) {
      this.setState({activeItem});
    }

  }

  WithAuthorization.displayName = `WithAuthorization(${Component.displayName || Component.name || `Component`})`;

  return WithAuthorization;
};

withAuthorization.propTypes = {
  handleActivateElement: PropTypes.func.isRequired
};


export default withAuthorization;
