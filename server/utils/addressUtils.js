import WAValidator from 'wallet-address-validator'
import request from 'request'

export const isValidAddress = (coinAddress) => {
  isValidBTCAddress(coinAddress)
  .then(result => {
    if (result)
      return true
    else
      isValidLTCAddress(coinAddress)
      .then(resultLTC => {
        if(resultLTC)
          return true
        else
          isValidDOGEAddress(coinAddress)
          .then(resultDOGE => {
            if (resultDOGE)
              return true
            else
              return false
          })
      })
  })
}

const isValidBTCAddress = (add) => {
  let btcURL = 'https://api.blockcypher.com/v1/btc/main/addrs/'+add
  console.log('btcURL : ' + btcURL)
  request(btcURL, function (error, response, body) {
    if (!error && response.statusCode == 200)
      return true
     else
      return false
  })
}

const isValidLTCAddress = (add) => {
  let ltcURL = 'https://api.blockcypher.com/v1/ltc/main/addrs/'+add
  console.log('ltcURL : ' + ltcURL)
  request(ltcURL, function (error, response, body) {
    if (!error && response.statusCode == 200)
      return true
     else
      return false
  })
}

const isValidDOGEAddress = (add) => {
  let dogeURL = 'https://api.blockcypher.com/v1/doge/main/addrs/'+add
  console.log('dogeURL : ' + dogeURL)
  request(dogeURL, function (error, response, body) {
    if (!error && response.statusCode == 200)
      return true
     else
      return false
  })
}