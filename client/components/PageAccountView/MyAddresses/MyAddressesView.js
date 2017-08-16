// libs
import React, {PropTypes} from "react"
import { reduxForm } from 'redux-form'
import { connect } from "react-redux"

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

	componentWillReceiveProps(nextProps) {
		if (!_.isNil(this.state)) {
			const { selectedKey, selectedAddress } = this.state;
			const { userAddressesList } = nextProps

			if ( !_.isNil(userAddressesList) && !_.isNil(userAddressesList[0]) && !_.isNil(userAddressesList[0].id) ) {
				const isAddressFound = _.find(userAddressesList, {id: selectedKey})

				if ( !_.isNil(selectedKey) && !_.isNil(isAddressFound) ) {
					this.setState({
						selectedAddress: userAddressesList[_.findIndex(userAddressesList, {id: selectedKey})]
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
		} else {
			const { userAddressesList } = nextProps

			if (userAddressesList && userAddressesList[0] && userAddressesList[0].id) {
				this.state = {
					selectedKey: userAddressesList[0].id,
					selectedAddress: userAddressesList[0]
				}
			}
		}
	}

	handleRowClick = (value) => {
		this.setState({
			selectedKey: value,
			selectedAddress: this.props.userAddressesList[_.findIndex(this.props.userAddressesList, {id: value})]
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