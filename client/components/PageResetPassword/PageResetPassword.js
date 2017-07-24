// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import PageResetPasswordInner from './PageResetPasswordInner'
import PageLoading from '../PageLoading';
import {resetPassword, isValidResetToken} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['password', 'confirmPassword']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Missing password field';
    hasErrors = true;
  }
  if (!values.confirmPassword || !values.confirmPassword.trim() === '') {
    if (values.password) {
      errors.confirmPassword = 'Re-type password';
      hasErrors = true;
    } else {
      errors.confirmPassword = 'Missing confirm password field';
      hasErrors = true;
    }
  }
  if(values.password && values.confirmPassword) {
    if(values.password != values.confirmPassword) {
      errors.confirmPassword = 'These passwords don\'t match. Try again?';
      hasErrors = true;
    }
  }
  return hasErrors && errors;
}

@reduxForm({
  form: 'resetPasswordForm',
  fields,
  validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { password, confirmPassword } = values;
    let userToken = props.match.params.usertoken
    return dispatch(resetPassword(userToken, password, confirmPassword))
    .then(action => {
      return action;
    }) 
  }
})
export default class PageResetPassword extends React.Component {
  state = {
    check : 1
  }

  componentWillMount() {
    const { dispatch } = this.props

    let token = this.props.match.params.usertoken
    dispatch(isValidResetToken(token))
    .then(action => {
      const { error, payload } = action
      if ( !error ) {
        const tokenMessage = get(payload, 'message', '');
        if (tokenMessage == 'true') {
          this.setState({
            check : 2
          });
        } else {
          this.setState({
            check : 3
          });
        }
      } else {
        this.setState({
          check : 3
        });
      }
    })
  }

  constructor(props) {
    super(props);    
  }
  render() {
    if (this.state.check == 1) {
      return <PageLoading {...this.props}/>
    } else if(this.state.check == 2) {
      return <PageResetPasswordInner {...this.props}/>
    } else {
      return (
				<div>
					<h1>Bad Request!</h1>
					<h3>Reset Password Token is invalid</h3>
				</div>
			);
    }
  }
}
