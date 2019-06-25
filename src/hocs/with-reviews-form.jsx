import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {getCheckReviewSend} from '../reducer/reviews/selectors';
import {ValidationForm} from '../constans.js';

const initialState = {
  rating: 0,
  comment: ``
};

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        form: initialState,
        disabled: true,
      };

      this._onFormChange = this._onFormChange.bind(this);
    }

    componentDidUpdate() {
      const {isReviewSend} = this.props;
      if (isReviewSend === true) {
        this.setState({
          form: initialState,
          disabled: true,
        });
      }
    }

    render() {
      return <Component
        {...this.props}
        form={this.state.form}
        onFormChange={this._onFormChange}
        disabled={!(this.state.form.rating > 0 && this.state.form.comment.length >
          ValidationForm.MIN_LENGTH_REVIEW && this.state.form.comment.length < ValidationForm.MAX_LENGTH_REVIEW)}
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
  }

  WithReviewsForm.propTypes = {
    isReviewSend: PropTypes.bool
  };

  return WithReviewsForm;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isReviewSend: getCheckReviewSend(state)
});


export {withReviewsForm};
export default compose(connect(mapStateToProps, null), withReviewsForm);


