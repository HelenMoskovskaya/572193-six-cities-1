import React, {PureComponent} from 'react';


const initialState = {
  email: ``,
  password: ``
};

const withAuthorization = (Component) => {
  return class WithAuthorization extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        form: initialState
      };

      this._onFormChange = this._onFormChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        form={this.state.form}
        onFormChange={this._onFormChange}
      />;
    }

    _onFormChange(evt) {
      const {value, name} = evt.currentTarget;

      this.setState((oldState) => ({
        form: Object.assign({}, oldState.form, {
          [name]: value
        }),
      }));
    }
  };
};

export default withAuthorization;
