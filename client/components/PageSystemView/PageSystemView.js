// libs
import React from "react"
import { connect } from "react-redux"
import {reduxForm} from 'redux-form'
import PageSystemViewInner from "./PageSystemViewInner"

// src
import { logoutWhenIdle } from '../../utils'

@reduxForm({
	form: 'AddTrxForm'
})
// @logoutWhenIdle()
class PageSystemView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			isHelpDialogOpen: false,
			isFormDialogOpen: false
		}
  }

	handleHelpDialogToggle = () => {
		const { isHelpDialogOpen } = this.state

		this.setState({
			isHelpDialogOpen: !isHelpDialogOpen
		})
	}
	
	handleFormDialogToggle = () => {
		const { isFormDialogOpen } = this.state

		this.setState({
			isFormDialogOpen: !isFormDialogOpen
		})
	}
	

  render() {
		return (
			<PageSystemViewInner
				{...this.props}
				{...this.state}
				onHelpDialogToggle={ this.handleHelpDialogToggle }
				onFormDialogToggle={ this.handleFormDialogToggle }
			/>
		)
  }
}

export default PageSystemView