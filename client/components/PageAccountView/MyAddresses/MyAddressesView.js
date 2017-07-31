// libs
import React, {PropTypes} from "react"
import { reduxForm } from 'redux-form'
import { connect } from "react-redux"
import findIndex from 'lodash/findIndex'

//src
import NicknameDialog from '../commons/DialogModalView'
import MyAddressesViewInner from './MyAddressesViewInner'

class MyAddresses extends React.Component {
	constructor(props) {
		super(props)
		if (props.userAddressesList && props.userAddressesList[0].id) {
			this.state = {
				selectedKey: props.userAddressesList[0].id,
				selectedAddress: props.userAddressesList[0]
			}
		}
	}

	handleRowClick = (value) => {
		console.log('selectedVAL: ', value)
		this.setState({
			selectedKey: value,
			selectedAddress: this.props.userAddressesList[findIndex(this.props.userAddressesList, {id: value})]
		})
		console.log('selectedKey: ', this.state.selectedKey, this.state.selectedAddress)
	}

	triggerDialogModal = (params) => {
		this.refs.dialog.handleOpen(params);
	}

	render() {
		return(
			<div>
				<NicknameDialog ref="dialog" handleModalOnSubmit={this.props.handleModalOnSubmit}/>								
				<MyAddressesViewInner 
					{...this.props}
					{...this.state}
					handleRowClick={ this.handleRowClick }
					triggerDialogModal={this.triggerDialogModal} />
			</div>
		)
	}
}


function mapStateToProps(state, ownProps) {
	let selectedKey = 0
	let selectedAddress = {}

	return {
		selectedKey,
		selectedAddress
	}
}

MyAddresses.propTypes={
	userAddressesList: PropTypes.array
};

export default connect(mapStateToProps)(MyAddresses);