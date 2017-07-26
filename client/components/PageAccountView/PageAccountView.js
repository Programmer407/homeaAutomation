// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import { providerInfo, accountconnectUrl, insertUserProvider, userProviderWallets, authenticateCoinBaseApi, getAllProviders, userProvidersList, deleteWallet, refreshUserProviders, getUserAddressesList, addUserAddresses, refreshUserAddresses, deleteUserAddress, updateUserAddress } from "../../actions/entities/accounts"
import PageLoading from '../PageLoading';


class PageAccountView extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			check: 1,
			newAddressesValue: '',
      selectedProvider: Object.assign({}, this.props.selectedProvider)
    };
  }

  connectProvider = (event) => {
		event.preventDefault();
		return this.props.dispatch(accountconnectUrl(this.state.selectedProvider))
      .then(action => {
        const { error, payload } = action
        if ( !error ) {
          console.log('response received : ' + JSON.stringify(action))
          var url = payload.redirecturl
          window.location = url
          return action
        }
      })
      .catch(error => { 
        console.log('error : ' + error)
      })
  }
  
  updateProviderSelection = (event, index, value) => {
    return this.setState({selectedProvider: value});
  }

	deleteUserWallet(value) {
		// event.preventDefault();
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(deleteWallet(value))
			.then(action => {
				const { error, payload } = action
				if ( !error ) {
					dispatch(userProvidersList())
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

	refreshUserWallets = (value) => {
		// event.preventDefault();
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(refreshUserProviders(value))
			.then(action => {
				const { error, payload } = action
				if ( !error ) {
					dispatch(userProvidersList())
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

	/* ADD BTC ADDRESSES */
	addNewAddresses = () => {
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(addUserAddresses(this.state.newAddressesValue))
			.then(action => {
				const { error, payload } = action
				if ( !error ) {
					this.setState({
						check : 2
					});
				}
			});
	}

	onRefreshAddressClick = (value) => {
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(refreshUserAddresses(value))
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

	onDeleteAddressClick = (value) => {
		console.log('Address ID: ', value)
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(deleteUserAddress(value))
			.then(action => {
				const { error, payload } = action
				if ( !error ) {
					this.setState({
						check : 2
					});
				}
			});
	}

	updateAddressesValue = (event) => {
    this.setState({
			newAddressesValue: event.target.value
		});
  }

	handleModalOnSubmit = (value) => {
		const { id, oldNickname } = value
		let { newNickname } = value
		if( !newNickname || !newNickname.trim() === '' ) {
			newNickname = oldNickname
		}
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(updateUserAddress(id, newNickname))
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
                          } else {
                            console.log('There are errors 2')
                          }
                        })
                    } else {
                      console.log('There are errors')
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
			// const {providerList} = this.props;

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
	let selectedProvider = {};
	let newAddressesValue = {};

  return {
		selectedProvider,
		newAddressesValue,
    providerList: state.entities.accounts.providerList,
		userProviderList: state.entities.accounts.userProviderList,
		userAddressesList: state.entities.accounts.userAddressesList
  };
}

export default connect(mapStateToProps)(PageAccountView);
