
var request = require('request');

export const getCoinBaseRedirectURL = (providerObj, req) => {
  let callBackUrl = req.protocol + '://' + req.get('host') + providerObj.redirectUrl1
  let encodedCallBackUrl = encodeURIComponent(callBackUrl)
  //console.log('encodedCallBackUrl : ' + encodedCallBackUrl)
  let redirectUrl = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+providerObj.clientId+'&redirect_uri='+encodedCallBackUrl+'&account=all&scope=wallet:user:read,wallet:accounts:read,wallet:addresses:read,wallet:transactions:read'
  return redirectUrl
}
