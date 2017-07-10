// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

// src
import PageResetPasswordInner from './PageResetPasswordInner'
import {login} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['password', 'confirmPassword']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if (!values.password || !values.password.trim() === '') {
    errors.password = 'Required';
    hasErrors = true;
  }
  if (!values.confirmPassword || !values.confirmPassword.trim() === '') {
    if (values.password) {
      errors.confirmPassword = 'Re-type password';
      hasErrors = true;
    } else {
      errors.confirmPassword = 'Required';
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
  validate
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { password, confirmPassword } = values;

    return dispatch(resetPassword(password, confirmPassword))
    .then(action => {
      const { error, payload } = action
      if ( !error ) {
        const linkNext = get(payload, 'user.linkHome', '/');
        dispatch(push(linkNext));
      } else {
        console.log(error);
      }
      return action;
    }) 
  }
})
export default class PageResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <PageResetPasswordInner {...this.props}/>
  }
  
  //HH: sorry @umar, I am ruining some beautiful code. 
  getParameterByName(name, url) {
    if (!url) 
      url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
