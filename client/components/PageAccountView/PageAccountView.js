// libs
import React from "react"
import {connect} from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import {
	providerCallback,
	myAccountData,
	accountconnectUrl,
	deleteWallet,
	refreshUserProviders,
	refreshUserAddresses,
	deleteUserAddress,
} from "../../actions/entities/accounts"
import PageLoading from '../PageLoading'

class PageAccountView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			check: 1,
			isNickDialogOpen: false,
			addressId: null,
			address: null,
			oldNickname: null,
			nicknameType: null,
			isSnackbarOpen: false,
			snackMessage: null,
			autoHideDuration: 4000,
			actionOnThisAddress: null,
			actionOnThisWallet: null,
		}
	}
  
  /* CONNECT TO WALLET OR EXCHANGE PROVIDER */
	connectProvider = (event) => {
		event.preventDefault()
		const selectedProvider = this.state.selectedProvider
		if (selectedProvider !== 0) {
			return this.props.dispatch(accountconnectUrl(selectedProvider))
				.then(action => {
					const {error, payload} = action
					if (!error) {
						let url = payload.redirecturl
						window.location = url
						return action
					}
				})
		}
	}
  
  /* UPDATE PROVIDER SELECTION FROM LIST */
	updateProviderSelection = (event, index, value) => {
		this.setState({selectedProvider: value})
	}
  
  /* DELETE USER WALLETS */
	deleteUserWallet = (value) => {
		this.setState({
			actionOnThisWallet: value
		}, function() {
			this.props.dispatch(deleteWallet(value))
		})
	}
  
  /* REFRESH USER WALLETS */
	refreshUserWallets = (value) => {
		this.setState({
			actionOnThisWallet: value
		}, function() {
				this.props.dispatch(refreshUserProviders(value))
					.then(action => {
						const {error, payload} = action
						
						if (!error && payload.redirecturl) {
							let url = payload.redirecturl
							window.location = url
							return action
						}
					})
		})
	}
  
  /* REFRESH BTC ADDRESSES */
	onRefreshAddressClick = (value) => {
		this.setState({
			actionOnThisAddress: value
		}, function() {
			this.props.dispatch(refreshUserAddresses(value))
		})
	}
  
  /* DELETE BTC ADDRESS */
	onDeleteAddressClick = (value) => {
		this.setState({
			actionOnThisAddress: value
		}, function() {
			this.props.dispatch(deleteUserAddress(value))
		})
	}
	
	componentDidMount() {
		const {dispatch} = this.props
		const providerName = this.props.match.params.providername
		if (providerName) {
			const paramsString = this.props.location.search
			const tokenCode = paramsString.substring(paramsString.indexOf('=') + 1)
			if (tokenCode) {
				dispatch(providerCallback(providerName, tokenCode))
					.then(action => {
						const {error} = action
						if (!error) {
							dispatch(myAccountData())
								.then(action => {
									const {error} = action
									if (!error) {
										this.setState({
											check: 2
										})
									}
								})
						}
					})
			} else {
				dispatch(myAccountData())
					.then(action => {
						const {error} = action
						if (!error) {
							this.setState({
								check: 2
							})
						}
					})	
			}
		} else {
			dispatch(myAccountData())
				.then(action => {
					const {error} = action
					if (!error) {
						this.setState({
							check: 2
						})
					}
				})
		}
	}
  
  /* HANDLER FUNCTIONS FOR SNACKBAR, MODALS */
	handleSnackbarOpen = (params) => {
		const {message, duration} = params
		
		this.setState({
			isSnackbarOpen: true,
			snackMessage: message,
			autoHideDuration: duration ? duration : 4000
		})
	}
	
	handleSnackbarClose = () => {
		this.setState({
			isSnackbarOpen: false,
			snackMessage: null,
			autoHideDuration: 4000
		})
	}
	
	handleNickDialogOpen = (params) => {
		const {id, address, oldNickname, type} = params
		
		this.setState({
			isNickDialogOpen: true,
			addressId: id,
			address,
			oldNickname,
			nicknameType: type
		})
	}
	
	handleNickDialogClose = () => {
		this.setState({
			isNickDialogOpen: false,
			addressId: null,
			address: null,
			oldNickname: null,
			nicknameType: null
		})
	}
	
	render() {
		if (this.state.check === 1) {
			return <PageLoading {...this.props}/>
		} else if (this.state.check === 2) {
			return (
        <div>
          <PageAccountViewInner
            onSelectionChange={ this.updateProviderSelection }
            onDeleteClick={this.deleteUserWallet}
            onRefreshClick={this.refreshUserWallets}
            onSelectionSubmit={ this.connectProvider }
            updateAddressesValue={ this.updateAddressesValue }
            onRefreshAddressClick={ this.onRefreshAddressClick }
            onDeleteAddressClick={ this.onDeleteAddressClick }
            onNicknameDialogOpen={ this.handleNickDialogOpen }
            onNicknameDialogClose={ this.handleNickDialogClose }
            onSnackbarOpen={ this.handleSnackbarOpen }
            onSnackbarClose={ this.handleSnackbarClose }
						{...this.props}
						{...this.state}
          />
        </div>
			)
		}
	}
}

/* redux connect() and related functions */
function mapStateToProps(state, ownProps) {
	const providerList = state.entities.accounts.providerList
	const userProviderList = state.entities.accounts.userProviderList
	const userAddressesList = state.entities.accounts.userAddressesList
	const isRefreshUserWalletList = state.entities.accounts.refreshUserWalletList
	const isDeleteUserWalletList = state.entities.accounts.deleteUserWalletList
	const isAddUserAddressList = state.entities.accounts.addUserAddressList
	const isRefreshUserAddressList = state.entities.accounts.refreshUserAddressList
	const isDeleteUserAddressList = state.entities.accounts.deleteUserAddressList
	const isUpdateUserAddressList = state.entities.accounts.updateUserAddressList
	
	return {
		providerList,
		userProviderList,
		userAddressesList,
		isRefreshUserWalletList,
		isDeleteUserWalletList,
		isAddUserAddressList,
		isRefreshUserAddressList,
		isDeleteUserAddressList,
		isUpdateUserAddressList
	}
}

export default connect(mapStateToProps)(PageAccountView)
