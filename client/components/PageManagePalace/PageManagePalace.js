// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageManagePalaceInner from './PageManagePalaceInner'
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
export default class PageManagePalace extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          addPalaceDialogOpen : false,
      }
      this.handleAddPalaceDialogClose = this.handleAddPalaceDialogClose.bind(this);
    this.handleAddPalaceDialogOpen = this.handleAddPalaceDialogOpen.bind(this);
  }

    handleAddPalaceDialogOpen(){
        this.setState({addPalaceDialogOpen : true})
    }

    handleAddPalaceDialogClose(){
        this.setState({addPalaceDialogOpen : false})
    }



  render() {
    return <PageManagePalaceInner {...this.props}
        {...this.state}
        handleAddPalaceDialogOpen = {this.handleAddPalaceDialogOpen}
        handleAddPalaceDialogClose = {this.handleAddPalaceDialogClose}
    />


  }
}
