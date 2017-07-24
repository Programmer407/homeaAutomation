// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import {providerInfo, accountconnectUrl, insertUserProvider, userProviderWallets, authenticateCoinBaseApi, getAllProviders, userProvidersList, deleteWallet, refreshUserProviders} from '../../actions/entities/accounts'
import PageLoading from '../PageLoading';

class PageAccountView extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			check: 1,
      selectedProvider: Object.assign({}, this.props.selectedProvider)
    };

    this.updateProviderSelection = this.updateProviderSelection.bind(this);
		this.deleteUserWallet = this.deleteUserWallet.bind(this);
		this.connectProvider = this.connectProvider.bind(this);
		this.refreshUserWallets = this.refreshUserWallets.bind(this);
  }

  connectProvider(event) {
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
  
  updateProviderSelection(event, index, value) {
    return this.setState({selectedProvider: value});
  }

	deleteUserWallet(value) {
		// event.preventDefault();
		console.log('WALLET SHALL BE DELETED HERE! WALLET ID IS ', value);
		this.setState({
			check: 1
		});
		const { dispatch } = this.props;
		dispatch(deleteWallet(value))
			.then(action => {
				const { error, payload } = action
				if ( !error ) {
					console.log('Wallet with the WalletID', value, 'has been deleted');
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

	refreshUserWallets(value) {
		// event.preventDefault();
		console.log('WALLETS WITH PROVIDER ID', value, 'SHALL BE RELOADED');
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

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(getAllProviders())
			.then(action => {
        const { error, payload } = action
        if ( !error ) {
					console.log('not errors')
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
      
    //console.log('componentWillMount this.props is : ' + JSON.stringify(this.props))
    
    let providerName = this.props.match.params.providername
    //console.log('componentWillMount providerName is : ' + providerName)
    if (providerName) {
      dispatch(providerInfo(providerName))
        .then(action => {
          const { error, payload } = action
          if ( !error ) {
            let providerObj = payload.providerObj
            if (providerObj.id = 1) {
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
						onChange={ this.updateProviderSelection }
						onDeleteClick={this.deleteUserWallet}
						onRefreshClick={this.refreshUserWallets}
						onSubmit={ this.connectProvider }
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

  return {
		selectedProvider,
    providerList: state.entities.accounts.providerList,
		userProviderList: state.entities.accounts.userProviderList
  };
}

export default connect(mapStateToProps)(PageAccountView);
