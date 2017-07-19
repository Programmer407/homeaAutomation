// libs
import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import {push} from 'react-router-redux'
import { connect } from "react-redux"
import PageAccountViewInner from "./PageAccountViewInner"
import {myaccountconnect, authenticateCoinBase} from '../../actions/entities/accounts'


class PageAccountView extends React.Component {
  constructor(props) {
    console.log('props are : ' + props)
    super(props)
    //this.state = {}
    this.connectProvider = this.connectProvider.bind(this);
  }

  connectProvider(event) {
    console.log('connectProvider method called. ' + this.props)
    event.preventDefault();
    return this.props.dispatch(myaccountconnect())
      .then(action => {
        const { error, payload } = action
        if ( !error ) {
          console.log('response received. : ' + JSON.stringify(action))
          //this.props.dispatch('https://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Faccounts%2Fcoinbase%2Fcallback&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:read')
          //window.open('https://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Faccounts%2Fcoinbase%2Fcallback&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:readhttps://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Faccounts%2Fcoinbase%2Fcallback&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:read', 'sharer', 'toolbar=0,status=0,width=548,height=625');
          //var url = "https://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Faccounts%2Fcoinbase%2Fcallback&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:readhttps://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri=http%3A%2F%2Flocalhost%2Fapi%2Faccounts%2Fcoinbase%2Fcallback&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:read";
          var url = payload.redirecturl
          var width = 450;
          var height = 650;
          var left = parseInt((screen.availWidth/2) - (width/2));
          var top = parseInt((screen.availHeight/2) - (height/2));
          var windowFeatures = "width=" + width + ",height=" + height +   
              ",status,resizable,left=" + left + ",top=" + top + 
              "screenX=" + left + ",screenY=" + top + ",scrollbars=yes";

          //window.open(url, "subWind", windowFeatures, "POS");
          window.location = url
          return action
        }
      })
      .catch(error => { 
        console.log('error : ' + error)
      })
  }
  
  componentWillMount() {
    console.log('this.props is : ' + JSON.stringify(this.props))
    let providerName = this.props.match.params.providername
    let tokenCode = this.props.location.search
    console.log('tokenCode 1 is : ' + tokenCode)
    if (tokenCode) {
      tokenCode = tokenCode.substring(tokenCode.indexOf('=')+1, tokenCode.indexOf('&'))
      console.log('tokenCode is : ' + tokenCode)
      //let tokenCode = 'ee60712ff16a1eba46b14fb295bb0baae55d94b12c02ebff1fb6fb8baf7fc852'
      this.props.dispatch(authenticateCoinBase(tokenCode))
      .then(action => {
        const { error, payload } = action
        if ( !error ) {
          console.log('Not errors')
        } else {
          console.log('There are errors')
        }
      })
    }
  }

  render() {
    return <div>
      <RaisedButton className="mWidthStyle" label="Connect" primary  onClick={this.connectProvider}/><div className="divider" />
      </div>
  }
}

export default connect(null)(PageAccountView);

