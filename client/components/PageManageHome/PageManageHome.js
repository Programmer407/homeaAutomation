// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageManageHomeInner from './PageManageHomeInner'
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
export default class PageManageHome extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          addAHomeDialogOpen : false,
      }
      this.handleAddHomeDialogClose = this.handleAddHomeDialogClose.bind(this);
    this.handleAddHomeDialogOpen = this.handleAddHomeDialogOpen.bind(this);
  }

    handleAddHomeDialogOpen(){
        this.setState({addAHomeDialogOpen : true})
    }

    handleAddHomeDialogClose(){
        this.setState({addAHomeDialogOpen : false})
    }



  render() {
    return <PageManageHomeInner {...this.props}
        {...this.state}
        handleAddHomeDialogOpen = {this.handleAddHomeDialogOpen}
        handleAddHomeDialogClose = {this.handleAddHomeDialogClose}
    />


  }
}
