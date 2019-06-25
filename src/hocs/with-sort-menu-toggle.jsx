import React, {PureComponent} from 'react';

const withSortMenuToggle = (Component) => {
  class WithSortMenuToggle extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isMenuOpen: false,
      };

      this._changeToggle = this._changeToggle.bind(this);

    }

    render() {
      return <Component
        {...this.props}
        changeToggle = {this._changeToggle}
        isMenuOpen={this.state.isMenuOpen}
      />;
    }

    _changeToggle() {
      this.setState({
        isMenuOpen: !this.state.isMenuOpen
      });
    }
  }

  withSortMenuToggle.displayName = `WithSortMenuToggle(${Component.displayName || Component.name || `Component`})`;

  return WithSortMenuToggle;
};


export default withSortMenuToggle;
