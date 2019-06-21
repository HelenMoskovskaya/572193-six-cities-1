import React, {PureComponent} from 'react';

const initialState ={ 
  rating: 0,
  comment: ``
}

const withReviewsForm = (Component) => {
  return class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        form: initialState,
        disabled: true,
      };

      this._onFormChange = this._onFormChange.bind(this);
      this._onSubmitForm = this._onSubmitForm.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        form={this.state.form}
        onFormChange={this._onFormChange}
        onSubmitForm={this._onSubmitForm}
        disabled={!(this.state.form.rating > 0 && this.state.form.comment.length > 50 && this.state.form.comment.length < 300)}
      />;
    }

    _onFormChange(evt) {
      const {value, name} = evt.currentTarget;
      
      this.setState(({form}) => ({
        form: {
          ...form,
          [name]: value,
        },
      }));
    }

    _onSubmitForm() {
        this.setState({
          form: initialState,
          disabled: true,
        });
    }
  };
};


export default withReviewsForm;

