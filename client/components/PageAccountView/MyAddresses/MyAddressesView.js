// libs
import React, {PropTypes} from "react"
import { reduxForm } from 'redux-form'
import { connect } from "react-redux"
import findIndex from 'lodash/findIndex'
import isNil from 'lodash/isNil'
import find from 'lodash/find'

//src
import MyAddressesViewInner from './MyAddressesViewInner'

class MyAddresses extends React.Component {
	constructor(props) {
		super(props)
		if (props.userAddressesList && props.userAddressesList[0] && props.userAddressesList[0].id) {
			this.state = {
				selectedKey: props.userAddressesList[0].id,
				selectedAddress: props.userAddressesList[0]
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!isNil(this.state)) {
			const { selectedKey, selectedAddress } = this.state;
			const { userAddressesList } = nextProps

			if ( !isNil(userAddressesList) && !isNil(userAddressesList[0]) && !isNil(userAddressesList[0].id) ) {
				if ( !isNil(selectedKey) && find(userAddressesList, {id: selectedKey}) ) {
					this.setState({
						selectedAddress: userAddressesList[findIndex(userAddressesList, {id: selectedKey})]
					})
					return true;
				} else {
					this.setState({
						selectedKey: userAddressesList[0].id,
						selectedAddress: userAddressesList[0]
					})
					return true;
				}
			} else {
				delete this.state.selectedKey;
				delete this.state.selectedAddress;
				return true;
			}
		}
	}

	handleRowClick = (value) => {
		this.setState({
			selectedKey: value,
			selectedAddress: this.props.userAddressesList[findIndex(this.props.userAddressesList, {id: value})]
		})
	}

	render() {
		return(
			<div>
				<MyAddressesViewInner 
					{...this.props}
					{...this.state}
					handleRowClick={ this.handleRowClick }
				/>
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