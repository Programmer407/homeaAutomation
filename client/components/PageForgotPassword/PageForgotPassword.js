// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'

// src
import PageForgotPasswordInner from './PageForgotPasswordInner'
import { forgotPassword } from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['email']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }
  return hasErrors && errors;
}

@reduxForm({
  form: 'forgotPasswordForm',
  fields,
  validate
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { email } = values;

    return dispatch(forgotPassword(email))
      .then(action => {
        const { error, payload } = action

        // if ( !error ) {
        //   const linkNext = get(payload, 'user.linkHome', '/login')
        //   dispatch(push(linkNext))
        // }
        return action
      })
  }
})
export default class PageForgotPassword extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <PageForgotPasswordInner {...this.props}/>
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
