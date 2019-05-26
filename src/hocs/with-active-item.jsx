import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  return class WithActiveItem extends PureComponent {
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
      />;
    }

    _handleActivateElement(activeItem) {
      this.setState({activeItem});
    }

  };
};

export default withActiveItem;
