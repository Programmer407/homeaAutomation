// libs
import React, {PropTypes} from "react"
import { reduxForm } from 'redux-form'
import { connect } from "react-redux"
import findIndex from 'lodash/findIndex'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

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
		if ( !isNull(this.state) ) {
			const { selectedKey, selectedAddress } = this.state;
			
			if (nextProps != this.props) {
				if ( nextProps.userAddressesList && nextProps.userAddressesList[0] && nextProps.userAddressesList[0].id && !isUndefined(selectedKey) ) {
					this.setState({
						selectedKey,
						selectedAddress: nextProps.userAddressesList[findIndex(nextProps.userAddressesList, { id: selectedKey })]
					})

					if ( isUndefined(selectedAddress) ) {
						this.state = {
							selectedKey: nextProps.userAddressesList[0].id,
							selectedAddress: nextProps.userAddressesList[0]
						}
					}
				}
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