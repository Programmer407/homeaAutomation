import React, {PropTypes} from "react";
import QueueAnim from 'rc-queue-anim';
import { connect } from "react-redux"
import DocumentTitle from "react-document-title";

// src
import MyAccountsViewInner from './MyAccountsViewInner'

class MyAccounts extends React.Component {
	constructor(props) {
		const { userProviderList } = props
		const { UserWallets: userWallets } = userProviderList[0]

		super(props)
		if (userProviderList && userProviderList[0] && userWallets.length > 0) {
			this.state = {
				selectedKey: userWallets[0].id,
				selectedWallet: userWallets[0]
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isNil(this.state)) {
			const { selectedKey, selectedWallet } = this.state;
			const { userProviderList } = nextProps
			const { UserWallets: userWallets } = userProviderList[0]

			if ( !_.isNil(userProviderList) && !_.isNil(userProviderList[0]) && userWallets.length > 0 ) {
				const isWalletFound = _.find(userWallets, function(w) { return w.id === selectedKey; });
				
				if ( !_.isNil(selectedKey) && !_.isNil(isWalletFound) ) {
					//debugger
					this.setState({
						selectedWallet: userWallets[_.findIndex(userWallets, {id: selectedKey})]
					})
					return true;
				} else {
					//debugger
					this.setState({
						selectedKey: userWallets[0].id,
						selectedWallet: userWallets[0]
					})
					return true;
				}
			} else {
				//debugger
				/* this.setState({
					selectedKey: null,
					selectedWallet: null
				}) */
				delete this.state.selectedKey;
				delete this.state.selectedWallet;
				return true;
			}
		}
		return true
	}

	handleRowClick = (value) => {
		const { userProviderList } = this.props
		const { UserWallets: userWallets } = userProviderList[0]

		this.setState({
			selectedKey: value,
			selectedWallet: userWallets[_.findIndex(userWallets, { id: value })]
		})
		//console.log('---> STATE:', this.state.selectedKey, this.state.selectedWallet)
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