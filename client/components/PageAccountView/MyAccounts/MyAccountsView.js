import React, {PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';
import { connect } from "react-redux"
import DocumentTitle from "react-document-title";
import findIndex from 'lodash/findIndex'
import isNil from 'lodash/isNil'
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
		if (!isNil(this.state)) {
			const { selectedKey, selectedWallet } = this.state;
			const { userProviderList } = nextProps
			const { UserWallets: userWallets } = userProviderList[0]

			if ( !isNil(userProviderList) && !isNil(userProviderList[0]) && !isNil(userWallets.length > 0) ) {
				if ( !isNil(selectedKey) && find(userWallets, {id: selectedKey}) ) {
					this.setState({
						selectedWallet: userWallets[findIndex(userWallets, {id: selectedKey})]
					})
					return true;
				} else {
					this.setState({
						selectedKey: userWallets[0].id,
						selectedWallet: userWallets[0]
					})
					return true;
				}
			} else {
				delete this.state.selectedKey;
				delete this.state.selectedWallet;
				return true;
			}
		}
		return true
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