// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageManageFloorInner from './PageManageFloorInner'
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
export default class PageManageFloor extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          addAFloorDialogOpen : false,
      }
      this.handleAddFloorDialogClose = this.handleAddFloorDialogClose.bind(this);
    this.handleAddFloorDialogOpen = this. handleAddFloorDialogOpen.bind(this);
  }

    handleAddFloorDialogOpen(){
        this.setState({addAFloorDialogOpen : true})
    }

    handleAddFloorDialogClose(){
        this.setState({addAFloorDialogOpen : false})
    }



  render() {
    return <PageManageFloorInner {...this.props}
        {...this.state}
        handleAddFloorDialogOpen = {this. handleAddFloorDialogOpen}
        handleAddFloorDialogClose = {this.handleAddFloorDialogClose}
    />


  }
}
