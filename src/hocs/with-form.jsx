import React, {PureComponent} from 'react';

const withForm = (initialState) => {
  return function WrapperForm(Component) {
    return class WithForm extends PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          data: initialState,
        };

        this._onFormChange = this._onFormChange.bind(this);

      }

      render() {
        return <Component
          {...this.props}
          onFormChange={this._onFormChange}
          data={this.state.data}
        />;
      }

      _onFormChange(evt) {
        const {value, name} = evt.currentTarget;
        
        this.setState(({ data }) => ({
          data: {
            ...data,
            [name]: value,
          }
        }));
      }
    };
  };
};


export default withForm;
