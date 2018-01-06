// libs
import React from 'react'
import {reduxForm, change as changeFieldValue} from 'redux-form'
import {push} from 'react-router-redux'
import PageManageApplianceInner from './PageManageApplianceInner'
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
export default class PageManageAppliance extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          addApplianceDialogOpen : false,
          addSensorDialogOpen : false
      }
      this.handleAddApplianceDialogClose = this.handleAddApplianceDialogClose.bind(this);
    this.handleAddApplianceDialogOpen = this.handleAddApplianceDialogOpen.bind(this);
    this.handleAddSensoDialogClose = this.handleAddSensoDialogClose.bind(this);
    this.handleAddSensorDialogOpen  = this.handleAddSensorDialogOpen.bind(this);
  }

    handleAddApplianceDialogOpen(){
        this.setState({addApplianceDialogOpen : true})
    }

    handleAddApplianceDialogClose(){
        this.setState({addApplianceDialogOpen : false})
    }


    handleAddSensorDialogOpen(){
        this.setState({addSensorDialogOpen : true})
    }

    handleAddSensoDialogClose(){
        this.setState({addSensorDialogOpen : false})
    }


  render() {
    return <PageManageApplianceInner {...this.props}
        {...this.state}
        handleAddApplianceDialogOpen = {this.handleAddApplianceDialogOpen}
        handleAddApplianceDialogClose = {this.handleAddApplianceDialogClose}
        handleAddSensoDialogClose = {this.handleAddSensoDialogClose}
        handleAddSensorDialogOpen = {this.handleAddSensorDialogOpen}
    />


  }
}
