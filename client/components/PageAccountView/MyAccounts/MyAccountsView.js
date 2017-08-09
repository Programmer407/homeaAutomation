import React, {PropTypes} from "react";
import { connect } from "react-redux"

// src
import MyAccountsViewInner from './MyAccountsViewInner'

class MyAccounts extends React.Component {
	constructor(props) {
		super(props)
		const { userProviderList } = props
		
		if (!_.isNil(userProviderList) && !_.isNil(userProviderList[0])) {
			const { UserWallets: userWallets } = userProviderList[0]

			if (userWallets && userWallets.length > 0) {
				this.state = {
					selectedKey: userWallets[0].id,
					selectedWallet: userWallets[0]
				}
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isNil(this.state)) {
			let userWallets = []
			const { selectedKey } = this.state
			const { userProviderList } = nextProps
			
			userWallets = _.flatten(userProviderList.map(userProviderListItem => {
				return _.concat(userWallets, userProviderListItem.UserWallets)
			}))

			if ( !_.isNil(userProviderList) && !_.isNil(userProviderList[0]) && userWallets.length > 0 ) {
				const isWalletFound = _.find(userWallets, function(w) { return w.id === selectedKey })
				
				if ( !_.isNil(selectedKey) && !_.isNil(isWalletFound) ) {
					this.setState({
						selectedWallet: userWallets[_.findIndex(userWallets, {id: selectedKey})]
					})
				} else {
					this.setState({
						selectedKey: userWallets[0].id,
						selectedWallet: userWallets[0]
					})
				}
			} else {
				delete this.state.selectedKey
				delete this.state.selectedWallet
			}
		}
	}

	handleRowClick = (value) => {
		let userWallets = []
		const { userProviderList } = this.props
		
		userWallets = _.flatten(userProviderList.map(userProviderListItem => {
			return _.concat(userWallets, userProviderListItem.UserWallets)
		}))

		this.setState({
			selectedKey: value,
			selectedWallet: userWallets[_.findIndex(userWallets, { id: value })]
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
	const selectedKey = 0
	const selectedWallet = {}

	return {
		selectedKey,
		selectedWallet
	}
}

MyAccounts.propTypes = {
  providerList: PropTypes.array,
	userProviderList: PropTypes.array,
	onSelectionChange: React.PropTypes.func.isRequired,
	onSelectionSubmit: React.PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(MyAccounts)
