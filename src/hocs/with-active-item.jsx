import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
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

  WithActiveItem.displayName = `WithActiveItem(${Component.displayName || Component.name || `Component`})`;

  return WithActiveItem;
};

withActiveItem.propTypes = {
  handleActivateElement: PropTypes.func.isRequired
};


export default withActiveItem;
