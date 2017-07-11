// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

// src
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
  validate
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    const { password, confirmPassword } = values;
    let userToken = props.match.params.usertoken
    //console.log('props are : ' + userToken)
    return dispatch(resetPassword(userToken, password, confirmPassword))
    .then(action => {
      const { error, payload } = action
      /****if ( !error ) {
        const linkNext = get(payload, 'user.linkHome', '/');
        console.log('linkNext is : ' + linkNext)
        dispatch(push(linkNext));
      }/* else {
        console.log(error);
      }*/
      return action;
    }) 
  }
})
export default class PageResetPassword extends React.Component {
  state = {
    check : 1,
  }

  componentWillMount() {
    let token = this.props.match.params.usertoken
    this.props.dispatch(isValidResetToken(token))
    .then(action => {
      const { error, payload } = action
      if ( !error ) {
        const tokenMessage = get(payload, 'message', '');
        if (tokenMessage == 'true') {
          this.setState({
            check : 2,
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
      return <div>
            <h1>Bad Request!</h1>
            <h3>Reset Password Token is invalid</h3>
          </div>;
    }
  }
  
  //HH: sorry @umar, I am ruining some beautiful code. 
  /*getParameterByName(name, url) {
    if (!url) 
      url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }*/
}
