// libs
import React from 'react'
import {reduxForm} from 'redux-form'
import {push} from 'react-router-redux'
import get from 'lodash/get'

// src
import PageRegisterInner from './PageRegisterInner'
import {register} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = ['username', 'email', 'password']

const validate = values => {
  return {}
}

@reduxForm({
  form: 'registerForm',
  fields,
  validate
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
    debugger;
    const { username, email, password } = values

    return dispatch(register(username, email, password))
      .then(action => {
        const { error, payload } = action

        if ( !error ) {
          const linkNext = get(payload, 'user.linkHome', '/login')
          dispatch(push(linkNext))
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
