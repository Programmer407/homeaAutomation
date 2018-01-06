// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageManageAccountInner from './PageManageAccountInner'
import {register} from '../../actions/entities/users'
import { bindForm } from '../../utils'



@reduxForm({
  form: 'registerForm',
  touchOnBlur: false
})
@bindForm({
  onSubmit: (values, dispatch, props) => {


    /*return dispatch(register(firstName, lastName, email, password))
    .then(action => {
      return action
    })*/
    // dispatch(register(firstName, lastName, email, password))

  }
})
export default class PageManageAccount extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          addAccountDialogOpen : false,
      }
      this.handleAddAccountDialogClose = this.handleAddAccountDialogClose.bind(this);
    this.handleAddAccountDialogOpen = this.handleAddAccountDialogOpen.bind(this);
  }

    handleAddAccountDialogOpen(){
        this.setState({addAccountDialogOpen : true})
    }

    handleAddAccountDialogClose(){
        this.setState({addAccountDialogOpen : false})
    }



  render() {
    return <PageManageAccountInner {...this.props}
        {...this.state}
        handleAddAccountDialogOpen = {this.handleAddAccountDialogOpen}
        handleAddAccountDialogClose = {this.handleAddAccountDialogClose}
    />


  }
}
