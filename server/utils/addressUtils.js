import request from 'request'

export const addressInfo = (coinAddress) => {
  return new Promise(function(resolve, reject) {
  isValidBTCAddress(coinAddress)  
  .then(result => {
    if (result.isValid) {
      const myaddress = {isValid: true, addressType: 'BTC', balance: result.balance}
      resolve(myaddress)
    } else
      isValidLTCAddress(coinAddress)
      .then(resultLTC => {
        if (resultLTC.isValid) {
          const myaddress = {isValid: true, addressType: 'LTC', balance: resultLTC.balance}
          resolve(myaddress)
        } else
          isValidDOGEAddress(coinAddress)
          .then(resultDOGE => {
            if (resultDOGE.isValid) {
              const myaddress = {isValid: true, addressType: 'DOGE', balance: resultDOGE.balance}
              resolve(myaddress)
            } else {
              isValidETHAddress(coinAddress)
              .then(resultLTH => {
                if (resultLTH.isValid) {
                  const myaddress = {isValid: true, addressType: 'ETH', balance: resultLTH.balance}
                  resolve(myaddress)
                } else {  
                  const myaddress = {isValid: false, addressType: ''}
                  resolve(myaddress)
                }
              })
            }
          })
      })
  })
  })
}

const isValidBTCAddress = (add => {
  return new Promise(function(resolve, reject) {
    let btcURL = 'https://api.blockcypher.com/v1/btc/main/addrs/'+add
    request(btcURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyObj = JSON.parse(body);
        const resultObj = {isValid: true, balance: bodyObj.final_balance}
        resolve(resultObj)
      } else {
        const resultObj = {isValid: false, balance: ''}
        resolve(resultObj)
      }
    })
  })
})

const isValidLTCAddress = (add => {
  return new Promise(function(resolve, reject) {
    let ltcURL = 'https://api.blockcypher.com/v1/ltc/main/addrs/'+add
    request(ltcURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyObj = JSON.parse(body);
        const resultObj = {isValid: true, balance: bodyObj.final_balance}
        resolve(resultObj)
      } else {
        const resultObj = {isValid: false, balance: ''}
        resolve(resultObj)
      }
    })
  })
})

const isValidDOGEAddress = (add => {
  return new Promise(function(resolve, reject) {
    let dogeURL = 'https://api.blockcypher.com/v1/doge/main/addrs/'+add
    request(dogeURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var bodyObj = JSON.parse(body);
        const resultObj = {isValid: true, balance: bodyObj.final_balance}
        resolve(resultObj)
      } else {
        const resultObj = {isValid: false, balance: ''}
        resolve(resultObj)
      }
    })
  })
})

const isValidETHAddress = (add => {
  return new Promise(function(resolve, reject) {
    let etthURL = 'https://etherchain.org/api/account/'+add
    request(etthURL, function (error, response, body) {
      if (!error && response.statusCode == 200 && body) {
        var bodyObj = JSON.parse(body);
        if (bodyObj && bodyObj.data && bodyObj.data[0]) {
          const resultObj = {isValid: true, balance: bodyObj.data[0].balance}
          resolve(resultObj)
        } else {
          const resultObj = {isValid: false, balance: ''}
          resolve(resultObj)
        }
      } else {
        const resultObj = {isValid: false, balance: ''}
        resolve(resultObj)
      }
    })
  })
})