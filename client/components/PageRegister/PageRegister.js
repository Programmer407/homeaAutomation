// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'

// src
import PageRegisterInner from './PageRegisterInner'
import {register} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['firstName', 'lastName', 'email', 'password']

const validate = values => {
  let errors = {};
  let hasErrors = false;
  if( !values.firstName || !values.firstName.trim() === '' ) {
    errors.firstName = 'Missing first name field';
    hasErrors = true;
  }
  if( !values.lastName || !values.lastName.trim() === '' ) {
    errors.lastName = 'Missing last name field';
    hasErrors = true;
  }
  if (!values.email || !values.email.trim() === '') {
    errors.email = 'Missing email field';
    hasErrors = true;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    hasErrors = true;
  }
  if( !values.password || !values.password.trim() === '' ) {
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
  form: 'registerForm',
  fields,
  validate
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { firstName, lastName, email, password } = values;

    return dispatch(register(firstName, lastName, email, password))
    .then(action => {
      const { error, payload } = action
      console.log('action is : ' + JSON.stringify(action))
      if ( !error ) {
         const linkNext = get(payload, 'user.linkHome', '/')
         dispatch(push(linkNext))
      } else {
        console.log(error)
      }
      return action
    })
  }
})
export default class PageRegister extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <PageRegisterInner {...this.props}/>
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
