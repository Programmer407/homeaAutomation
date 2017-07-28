// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import { providerInfo, accountconnectUrl, insertUserProvider, userProviderWallets, authenticateCoinBaseApi, getAllProviders, userProvidersList, deleteWallet, refreshUserProviders, getUserAddressesList, addUserAddresses, refreshUserAddresses, deleteUserAddress, updateUserAddress } from "../../actions/entities/accounts"
import PageLoading from '../PageLoading';
import { reduxForm, reset } from 'redux-form'
import { bindForm } from '../../utils'


const fields = ['newAddresses']

const validate = values => {
	console.log('VALUES FROM VALIDATE: ', values)
  let errors = {}
  let hasErrors = false
  if (!values.newAddresses || !values.newAddresses.trim() === '') {
    errors.newAddresses = 'Provide at least one address.'
    hasErrors = true
  } else {
		if (values.newAddresses.length > 40) {
      errors.newAddresses = 'No address is that large. Try again?';
      hasErrors = true;
    }
	}
  return hasErrors && errors;
}


@reduxForm({
	form: 'newAddressesForm',
	fields,
	validate,
	touchOnBlur: false
})
@bindForm({
	onSubmit: (values, dispatch, props) => {
		console.log('VALUES FROM VALIDATE: ', values)
		const { newAddresses } = values
		return dispatch(addUserAddresses(newAddresses)).then(action => {
			dispatch(reset('newAddressesForm'))
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
				.catch(error => { 
					console.log('error : ' + error)
				})
		}
  }
  
	/* UPDATE PROVIDER SELECTION FROM LIST */
  updateProviderSelection = (event, index, value) => {
    return this.setState({selectedProvider: value});
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
      .catch(error => { 
        console.log('error : ' + error)
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


	handleModalOnSubmit = (value) => {
		const { id, oldNickname } = value
		let { newNickname } = value
		if( !newNickname || !newNickname.trim() === '' ) {
			newNickname = oldNickname
		}
		this.props.dispatch(updateUserAddress(id, newNickname))
	}


  componentWillMount() {
    const { dispatch } = this.props
      
    //console.log('componentWillMount this.props is : ' + JSON.stringify(this.props))
    
    let providerName = this.props.match.params.providername
    //console.log('componentWillMount providerName is : ' + providerName)
    if (providerName) {
      dispatch(providerInfo(providerName))
        .then(action => {
          const { error, payload } = action
          if ( !error ) {
            let providerObj = payload.providerObj
            if (providerObj.id == 1) {
              let paramsString = this.props.location.search
              console.log('paramsString is : ' + paramsString)
              if (paramsString) {
                let tokenCode = paramsString.substring(paramsString.indexOf('=')+1)
                console.log('tokenCode is : ' + tokenCode)
                dispatch(authenticateCoinBaseApi(tokenCode, providerObj.grantType, providerObj.clientId, providerObj.clientSecret))
                  .then(action => {
                    const { error, payload } = action
                    if ( !error ) {
                      console.log('Not errors')
                      console.log('payload is : ' + JSON.stringify(payload))
                      dispatch(insertUserProvider(payload.access_token, payload.refresh_token, providerObj.id))
                        .then(action => {
                          const { error, payload } = action
                          if ( !error ) {
                            console.log('Not errors 2')
                            dispatch(userProviderWallets(payload.userProvider.id))
                              .then(action => {
                                const { error, payload } = action
                                if ( !error ) {
                                  console.log('Not errors 3')
																	dispatch(getAllProviders())
																		.then(action => {
																			const { error, payload } = action
																			if ( !error ) {
																				console.log('not errors')
																				dispatch(userProvidersList())
																					.then(action => {
																						const { error, payload } = action
																						if ( !error ) {
																							dispatch(getUserAddressesList())
																								.then(action => {
																									const { error, payload } = action
																									if ( !error ) {
																										this.setState({
																											check : 2
																										});
																									}	
																							});
																						}	
																				});
																			}
																		});
                                }
                              })
                          }
                        })
                    }
                  })
              }
            }
          }
        })
    } else {
			dispatch(getAllProviders())
				.then(action => {
					const { error, payload } = action
					if ( !error ) {
						console.log('not errors')
						dispatch(userProvidersList())
							.then(action => {
								const { error, payload } = action
								if ( !error ) {
									dispatch(getUserAddressesList())
										.then(action => {
											const { error, payload } = action
											if ( !error ) {
												this.setState({
													check : 2
												});
											}	
									});
								}	
						});
					}
				});
		}
  }

  
  render() {
    if (this.state.check == 1) {
			return <PageLoading {...this.props}/>
		} else if(this.state.check == 2) {
			
			return (
				<div>
					<PageAccountViewInner 
						onSelectionChange={ this.updateProviderSelection }
						onDeleteClick={this.deleteUserWallet}
						onRefreshClick={this.refreshUserWallets}
						onSelectionSubmit={ this.connectProvider }
						onAddAddressesClick={ this.addNewAddresses }
						updateAddressesValue={ this.updateAddressesValue }
						onRefreshAddressClick={ this.onRefreshAddressClick }
						onDeleteAddressClick={ this.onDeleteAddressClick }
						handleModalOnSubmit={this.handleModalOnSubmit}
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