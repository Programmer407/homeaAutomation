import React, {PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';
import { connect } from "react-redux"
import DocumentTitle from "react-document-title";
import findIndex from 'lodash/findIndex'
import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'
import hasIn from 'lodash/hasIn'

// src
import MyAccountsViewInner from './MyAccountsViewInner'

class MyAccounts extends React.Component {
	constructor(props) {
		super(props)
		if (props.userProviderList && props.userProviderList[0] && props.userProviderList[0].UserWallets.length > 0) {
			this.state = {
				selectedKey: props.userProviderList[0].UserWallets[0].id,
				selectedWallet: props.userProviderList[0].UserWallets[0]
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if ( !isNull(this.state) ) {
			const { selectedKey, selectedWallet } = this.state;
			
			if (nextProps != this.props) {
				if (  !isUndefined(selectedKey) && nextProps.userProviderList && nextProps.userProviderList[0] && nextProps.userProviderList[0].UserWallets.length > 0 ) {
					this.state = {
						selectedKey,
						selectedWallet: nextProps.userProviderList[0].UserWallets[findIndex(nextProps.userProviderList[0].UserWallets, { id: selectedKey })]
					}

					if ( isUndefined(selectedWallet) ) {
						this.state = {
							selectedKey: nextProps.userProviderList[0].UserWallets[0].id,
							selectedWallet: nextProps.userProviderList[0].UserWallets[0]
						}
					}
				}
			}
		}

	}

	handleRowClick = (value) => {
		this.setState({
			selectedKey: value,
			selectedWallet: this.props.userProviderList[0].UserWallets[findIndex(this.props.userProviderList[0].UserWallets, { id: value })]
		})
	}

	render() {
		return (
			<div>
				<MyAccountsViewInner
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
	let selectedWallet = {}

	return {
		selectedKey,
		selectedWallet
	}
}

MyAccounts.propTypes={
  providerList: PropTypes.array,
	userProviderList: PropTypes.array,
	onSelectionChange: React.PropTypes.func.isRequired,
	onSelectionSubmit: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MyAccounts);