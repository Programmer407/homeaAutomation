// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import {userproviderslist, providerInfo, accountconnectUrl, insertUserProvider, userproviderwallets, authenticateCoinBaseApi, getAllProviders} from '../../actions/entities/accounts'
import PageLoading from '../PageLoading';

class PageAccountView extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			check: 1,
      provider: Object.assign({}, this.props.provider)
    };

    this.updateProviderSelection = this.updateProviderSelection.bind(this);
		this.connectProvider = this.connectProvider.bind(this);

  }

  connectProvider(event) {
    event.preventDefault();
    return this.props.dispatch(accountconnectUrl(1))
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
    return this.setState({provider: value});
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(getAllProviders())
			.then(action => {
        const { error, payload } = action
        if ( !error ) {
					this.setState({
						check : 2
					});
				}
      })
      
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
                            dispatch(userproviderwallets(payload.userProvider.id))
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
			const {providers} = this.props;
			return (
				<div>
					<PageAccountViewInner onSubmit={this.connectProvider} onChange={this.updateProviderSelection} selectedProvider={this.state.provider} providers={providers} />
				</div>
			)
    }
  }
}

/* redux connect() and related functions */
function mapStateToProps(state, ownProps) {
  let provider = {};

  return {
		provider,
    providers: state.entities.accounts
  };
}

export default connect(mapStateToProps)(PageAccountView);
