// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageDeleteUserInner from './PageDeleteUserInner'
import {register,deleteUser} from '../../actions/entities/users'
import { bindForm } from '../../utils'

const fields = [ 'email',]

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
  form: 'deleteUserForm',
    fields,
    validate,
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {
      const { email} = values;

    /*return dispatch(register(firstName, lastName, email, password))
    .then(action => {
      return action
    })*/
     dispatch(deleteUser( email))

  }
})
export default class PageDeleteUser extends React.Component {
  constructor(props) {
    super(props)
  }

    handleNoSpaces = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        if (fieldValue == ' ') {
            this.props.dispatch(changeFieldValue('registerForm', fieldName, ''));
            e.preventDefault();
        }
    }

  render() {
    return <PageDeleteUserInner {...this.props} onHandleNoSpaces={ this.handleNoSpaces }/>
  }
}
