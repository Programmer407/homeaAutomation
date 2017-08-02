// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import { providerCallback, myAccountData, accountconnectUrl, deleteWallet, refreshUserProviders, addUserAddresses, refreshUserAddresses, deleteUserAddress, updateUserAddress, updateAssociatedMyAdd, updateAssociatedWalletAdd } from "../../actions/entities/accounts"
import PageLoading from '../PageLoading';
import { reduxForm } from 'redux-form'
import split from 'lodash/split'
import uniq from 'lodash/uniq'

// src
import NicknameDialog from './commons/DialogModalView'
import { bindForm, logoutWhenIdle } from '../../utils'

const fields = ['newAddresses']

const validate = values => {
	let errors = {}
	let hasErrors = false
	const { newAddresses } = values
	const newAddressesArr = split(newAddresses, '\n')
	const uniqAddressesArr = uniq(newAddressesArr)
	
	if (!newAddresses || !newAddresses.trim() === '') {
		errors.newAddresses = 'Provide at least one address.'
		hasErrors = true
	}

	if (newAddressesArr.length != uniqAddressesArr.length) {
		errors.newAddresses = 'Provide distinct addresses.'
		hasErrors = true
	}

	newAddressesArr.map(newAddress => {
		if (newAddress.length > 50) {
			errors.newAddresses = 'No address is that large. Try again?';
			hasErrors = true;
		}
	})

  return hasErrors && errors;
}

@logoutWhenIdle()
@reduxForm({
	form: 'newAddressesForm',
	fields,
	validate,
	touchOnBlur: false
})

@bindForm({
	onSubmit: (values, dispatch, props) => {
		const newAddressesArr = split(values.newAddresses, '\n')

		return dispatch(addUserAddresses(newAddressesArr)).then(() => {
			dispatch(props.reset('newAddressesForm'))
			dispatch(props.untouch('newAddressesForm', ...fields))
		})
	}
})

class PageAccountView extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			check: 1,
			newAddressesValue: '',
      selectedProvider: 0
    };
  }

	/* CONNECT TO WALLET OR EXCHANGE PROVIDER */
  connectProvider = (event) => {
		event.preventDefault();
		const selectedProvider = this.state.selectedProvider;
		if (selectedProvider !== 0) {
			return this.props.dispatch(accountconnectUrl(selectedProvider))
				.then(action => {
					const { error, payload } = action
					if ( !error ) {
						var url = payload.redirecturl
						window.location = url
						return action
					}
				})
		}
  }
  
	/* UPDATE PROVIDER SELECTION FROM LIST */
  updateProviderSelection = (event, index, value) => {
    this.setState({selectedProvider: value});
  }

	/* DELETE USER WALLETS */
	deleteUserWallet = (value) => {
		this.props.dispatch(deleteWallet(value))
	}

	/* REFRESH USER WALLETS */
	refreshUserWallets = (value) => {
		this.props.dispatch(refreshUserProviders(value))
		.then(action => {
				const { error, payload } = action
				if ( !error && payload.redirecturl ) {
					var url = payload.redirecturl
					window.location = url
          return action
        }
      })
	}

	/* REFRESH BTC ADDRESSES */
	onRefreshAddressClick = (value) => {
		this.props.dispatch(refreshUserAddresses(value))
	}

	/* DELETE BTC ADDRESS */
	onDeleteAddressClick = (value) => {
		this.props.dispatch(deleteUserAddress(value))
	}

	/* EDIT ADDRESS NICKNAME, NOT ASSOCIATED ADDRESS NICKNAME */
	handleAddressNicknameChange = (value) => {
		const { id, oldNickname } = value
		let { newNickname } = value
		if( !newNickname || !newNickname.trim() === '' ) {
			newNickname = oldNickname
		}
		this.props.dispatch(updateUserAddress(id, newNickname))
	}
	
	/* EDIT ASSOCIATED ADDRESS NICKNAME, NOT MY ADDRESS NICKNAME */
	handleAssocAddressNicknameChange = (value) => {
		const { id, oldNickname } = value
		let { newNickname } = value
		if( !newNickname || !newNickname.trim() === '' ) {
			newNickname = oldNickname
		}
		this.props.dispatch(updateAssociatedMyAdd(id, newNickname))
	}
	
	/* EDIT ASSOCIATED ADDRESS OF WALLET NICKNAME */
	handleWalletAssocAddressNicknameChange = (value) => {
		const { id, oldNickname } = value
		let { newNickname } = value
		if( !newNickname || !newNickname.trim() === '' ) {
			newNickname = oldNickname
		}
		this.props.dispatch(updateAssociatedWalletAdd(id, newNickname))
	}



  componentDidMount() {
    const { dispatch } = this.props
    let providerName = this.props.match.params.providername
    if (providerName) {
			let paramsString = this.props.location.search
			let tokenCode = paramsString.substring(paramsString.indexOf('=')+1)
			dispatch(providerCallback(providerName, tokenCode))
        .then(action => {
          const { error } = action
          if ( !error ) {
						dispatch(myAccountData())
							.then(action => {
								const { error } = action
								if ( !error ) {
									this.setState({
										check : 2
									});
								}
							});
					}
				})
		} else {
			dispatch(myAccountData())
				.then(action => {
					const { error } = action
					if ( !error ) {
						this.setState({
							check : 2
						});
					}
				});
		}
	}

	triggerDialogModal = (params) => {
		this.refs.dialog.handleOpen(params);
	}

  render() {
    if (this.state.check == 1) {
			return <PageLoading {...this.props}/>
		} else if(this.state.check == 2) {
			return (
				<div>
					<NicknameDialog 
						ref="dialog"
						handleAddressNicknameChange={ this.handleAddressNicknameChange }
						handleAssocAddressNicknameChange={ this.handleAssocAddressNicknameChange }
						handleWalletAssocAddressNicknameChange={ this.handleWalletAssocAddressNicknameChange }
					/>	
					<PageAccountViewInner 
						onSelectionChange={ this.updateProviderSelection }
						onDeleteClick={this.deleteUserWallet}
						onRefreshClick={this.refreshUserWallets}
						onSelectionSubmit={ this.connectProvider }
						updateAddressesValue={ this.updateAddressesValue }
						onRefreshAddressClick={ this.onRefreshAddressClick }
						onDeleteAddressClick={ this.onDeleteAddressClick }
						handleAddressNicknameChange={this.handleAddressNicknameChange}
						handleAssocAddressNicknameChange={this.handleAssocAddressNicknameChange}
						handleWalletAssocAddressNicknameChange={this.handleWalletAssocAddressNicknameChange}
						triggerDialogModal={ this.triggerDialogModal }
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
	let selectedProvider = 0
	let newAddressesValue = {}
	const isRefreshUserAddressList = state.entities.accounts.refreshUserAddressList
	const isRefreshUserWalletList = state.entities.accounts.refreshUserWalletList
	
  return {
		selectedProvider,
		newAddressesValue,
    providerList: state.entities.accounts.providerList,
		userProviderList: state.entities.accounts.userProviderList,
		userAddressesList: state.entities.accounts.userAddressesList,
		isRefreshUserAddressList,
		isRefreshUserWalletList
  };
}

export default connect(mapStateToProps)(PageAccountView);