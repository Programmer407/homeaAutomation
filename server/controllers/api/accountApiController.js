// libs
import express from 'express'
import async from 'async';
import moment from 'moment';
var request = require('request');
import coinBaseService from '../../services/CoinBaseService'
import blockexplorer from 'blockchain.info/blockexplorer'
import WAValidator from 'wallet-address-validator';

// src
import { ensureAnonymity, caughtError } from '../../utils'
import UserProvider from './../../models/UserProvider'
import UserWallet from './../../models/UserWallet'
import UserAddress from './../../models/UserAddress'
import Transaction from './../../models/Transaction'
import AssociatedAddress from '../../models/AssociatedAddress'
import { findProviderByID, findAllProviderList, findProviderByName } from '../../managers/providerManager'
import { insertUserProvider, updateUserProvider, findUserProviderByID, findUserProviderByAccountName, findAllUserProviderList } from '../../managers/userProviderManager'
import { insertUserWallet, updateUserWallet, findUserWalletByWalletId, deleteUserWalletById } from '../../managers/userWalletManager'
import { findAllUserAddresses, findUserAddressByAddress, findUserAddressById, insertUserAddress, updateUserAddress, deleteUserAddressById } from '../../managers/userAddressesManager'
import { findTransactionByTrxId, updateTransaction } from '../../managers/transactionManager'
import { findTransactionTypeById, findTransactionTypeByName } from '../../managers/transactionTypeManager'
import { findTrxImportTypeById } from '../../managers/transactionImportManager'
import { findAssociatedAddById, findAssociatedAddByAdd, updateAssociatedAdd } from '../../managers/associatedAddressManager'

const router = express.Router()

router.get('/api/accounts/my-account-all-data', (req, res) => {
    const {user} = req
    if (user) {
        findAllProviderList()
            .then(providerList => {
                findAllUserProviderList(user.id)
                    .then(userProviderList => {
                        findAllUserAddresses(user.id)
                            .then(userAddressesList => {
                                res
                                    .status(200)
                                    .send({
                                        providerList, userProviderList, userAddressesList
                                    })
                            })
                            .catch(error => {
                                caughtError(res, error)
                            })
                    })
                    .catch(error => {
                        caughtError(res, error)
                    })
            })
            .catch(error => {
                caughtError(res, error)
            })
    } else {
        res
            .status(500)
            .send({
                message: 'Something went wrong, Please try again'
            })
    }
})

router.post('/api/accounts/my-account-connect-url', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { providerId } = body

    if ( !providerId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }

    findProviderByID(providerId)
        .then(providerObj => {
            if (providerObj) {
                if (providerId == 1) {
                    let redirectURL = coinBaseService.getCoinBaseRedirectURL(providerObj, req)
                    res
                        .status(200)
                        .send({
                        redirecturl: redirectURL
                    })
                }
            } else {
                res
                .status(400)
                .send({
                    message: 'Provider not found'
                })
            }
        })
        .catch(error => {
            caughtError(res, error)
        })
})

router.post('/api/accounts/wallet-provider-callback', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { providerName, tokenCode } = body

    if ( !providerName ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }

    findProviderByName(providerName)
        .then(providerObj => {
            if (providerObj) {
                if (providerObj.id == 1) {
                    if (tokenCode) {
                        let redirectURL = req.protocol + '://' + req.get('host') + providerObj.redirectUrl1
                        var headers = {
                            'User-Agent':       'Super Agent/0.0.1',
                            'Content-Type':     'application/json'
                        }

                        // Configure the request
                        var options = {
                            url: 'https://api.coinbase.com/oauth/token',
                            method: 'POST',
                            headers: headers,
                            form: {'code': tokenCode,
                                    'grant_type': providerObj.grantType, 
                                    'client_id': providerObj.clientId,
                                    'client_secret': providerObj.clientSecret,
                                    'redirect_uri': redirectURL}
                        }

                        // Start the request
                        request(options, function (error, response, responseBody) {
                            if (!error && response.statusCode == 200) {
                                let access_token_string = responseBody.substring(responseBody.indexOf('access_token')+15, responseBody.indexOf(',')-1)
                                let refresh_token_string = responseBody.substring(responseBody.indexOf('refresh_token')+16)
                                refresh_token_string = refresh_token_string.substring(0, refresh_token_string.indexOf(',')-1)
                                
                                var Client = require('coinbase').Client;
                                var client = new Client({'accessToken': access_token_string, 'refreshToken': refresh_token_string});
                                client.getCurrentUser(function(err, accountUser) {
                                    if (err && !accountUser) {
                                        caughtError(res, err)
                                    } else {
                                        async.waterfall([
                                            function(callback) {
                                                findUserProviderByAccountName(accountUser.id)
                                                    .then(userProvider => {
                                                        if (userProvider) {
                                                            userProvider.accessToken = access_token_string
                                                            userProvider.refreshToken = refresh_token_string
                                                            callback(null, userProvider);
                                                        } else {
                                                            userProvider = UserProvider.build({accountName: accountUser.id, accessToken: access_token_string, refreshToken: refresh_token_string})
                                                            userProvider.setUser(user, {save: false})
                                                            userProvider.setProvider(providerObj, {save: false})
                                                            callback(null, userProvider);
                                                        }
                                                    })
                                            },
                                            function(userProvider, callback) {
                                                updateUserProvider(userProvider)
                                                    .then(updatedUserProvider => {
                                                        callback(null, updatedUserProvider);
                                                    })
                                            },
                                            function(updatedUserProvider, callback) {
                                                client.getAccounts({}, function(err, accounts) {
                                                    accounts.forEach(function(acct, i) {
                                                        async.waterfall([
                                                            function(callback) {
                                                                findUserWalletByWalletId(acct.id)
                                                                    .then(userWallet => {
                                                                        if (userWallet) {
                                                                            userWallet.walletName = acct.name
                                                                            userWallet.walletType = acct.type
                                                                            userWallet.balance = acct.balance.amount
                                                                            userWallet.currency = acct.currency.code
                                                                            callback(null, userWallet);
                                                                        } else {
                                                                            userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                                            userWallet.setUserprovider(updatedUserProvider, {save: false})
                                                                            callback(null, userWallet);
                                                                        }
                                                                    })
                                                            }
                                                        ],
                                                        function(err, userWallet) {
                                                            updateUserWallet(userWallet)
                                                                .then(updatedUserWallet => {
                                                                    if (i == accounts.length-1){
                                                                        callback(null, 'some parameter');
                                                                    }
                                                                })
                                                        })
                                                    })
                                                })

                                            }
                                        ],
                                        function(err, args1) {
                                            res
                                                .status(200)
                                                .send({
                                                    message: 'UserProvider inserted'
                                                })
                                        })
                                    }
                                })
                                
                            } else {
                                console.log('error from coinbase authentication : ' + error)
                            }
                        })
                    }
                }
            } else {
                res
                    .status(400)
                    .send({
                        message: 'Provider not found'
                    })
            }
        })
        .catch(error => {
            caughtError(res, error)
        })
})

router.post('/api/accounts/delete-userprovider-wallet', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { userWalletId } = body

    if ( !userWalletId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    deleteUserWalletById(userWalletId)
        .then(result => {
            if (result) {
                findAllUserProviderList(user.id)
                .then(userProviderList => {
                    res
                        .status(200)
                        .send({
                            userProviderList
                        })
                })
                .catch(error => {
                    caughtError(res, error)
                })
            } else {
                res
                .status(400)
                .send({
                    message: 'Something went wrong, Please try again'
                })
            }
        })
})

router.post('/api/accounts/refresh-userproviders', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { userProviderId } = body

    if ( !userProviderId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }

    findUserProviderByID(userProviderId)
        .then(userProviderObj => {
            var Client = require('coinbase').Client;
            var client = new Client({'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken});
            client.getAccounts({}, function(err, accounts) {
                if (err) {
                    if (err == 'RevokedToken: The access token was revoked') {
                        let redirectURL = coinBaseService.getCoinBaseRedirectURL(userProviderObj.provider, req)
                        return res
                            .status(200)
                            .send({
                                redirecturl: redirectURL
                            })
                    } else {
                        // Configure the request
                        var headers = {
                            'User-Agent':       'Super Agent/0.0.1',
                            'Content-Type':     'application/json'
                        }

                        var options = {
                            url: 'https://api.coinbase.com/oauth/token',
                            method: 'POST',
                            headers: headers,
                            form: {'grant_type': 'refresh_token', 
                                'client_id': userProviderObj.provider.clientId,
                                'client_secret': userProviderObj.provider.clientSecret,
                                'refresh_token': userProviderObj.refreshToken}
                        }

                        // Start the request
                        request(options, function (error, response, responseBody) {
                            if (!error && response.statusCode == 200) {
                                let access_token_string = responseBody.substring(responseBody.indexOf('access_token')+15, responseBody.indexOf(',')-1)
                                let refresh_token_string = responseBody.substring(responseBody.indexOf('refresh_token')+16)
                                refresh_token_string = refresh_token_string.substring(0, refresh_token_string.indexOf(',')-1)
                                
                                userProviderObj.accessToken = access_token_string
                                userProviderObj.refreshToken = refresh_token_string

                                updateUserProvider(userProviderObj)
                                    .then(updatedUserProvider => {
                                        client = new Client({'accessToken': updatedUserProvider.accessToken, 'refreshToken': updatedUserProvider.refreshToken});
                                        client.getAccounts({}, function(err, accounts) {
                                            async.waterfall([
                                                function(callback) {
                                                    accounts.forEach(function(acct, i) {
                                                        async.waterfall([
                                                            function(callback) {
                                                                findUserWalletByWalletId(acct.id)
                                                                    .then(userWallet => {
                                                                        if (userWallet) {
                                                                            userWallet.walletName = acct.name
                                                                            userWallet.walletType = acct.type
                                                                            userWallet.balance = acct.balance.amount
                                                                            userWallet.currency = acct.currency.code
                                                                            callback(null, userWallet);
                                                                        } else {
                                                                            userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                                            userWallet.setUserprovider(userProviderObj, {save: false})
                                                                            callback(null, userWallet);
                                                                        }
                                                                    })
                                                            }
                                                        ],
                                                        function(err, userWallet) {
                                                            updateUserWallet(userWallet)
                                                                .then(updatedUserWallet => {
                                                                    if (i == accounts.length-1){
                                                                        callback(null, 'some parameter');
                                                                    }
                                                                })
                                                        })
                                                    })

                                                },
                                                function(arg1, callback) {
                                                    findAllUserProviderList(user.id)
                                                        .then(userProviderList => {
                                                            callback(null, userProviderList);
                                                        })
                                                }
                                            ],
                                            function(err, userProviderList) {
                                                res
                                                    .status(200)
                                                    .send({
                                                        userProviderList
                                                    })
                                            })
                                        })
                                    })
                                    .catch(error => {
                                        caughtError(res, error)
                                    })    
                            }
                        })

                    }
                } else {
                    async.waterfall([
                        function(callback) {
                            accounts.forEach(function(acct, i) {
                                async.waterfall([
                                    function(callback) {
                                        findUserWalletByWalletId(acct.id)
                                            .then(userWallet => {
                                                if (userWallet) {
                                                    userWallet.walletName = acct.name
                                                    userWallet.walletType = acct.type
                                                    userWallet.balance = acct.balance.amount
                                                    userWallet.currency = acct.currency.code
                                                    callback(null, userWallet);
                                                } else {
                                                    userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                    userWallet.setUserprovider(userProviderObj, {save: false})
                                                    callback(null, userWallet);
                                                }
                                            })
                                    }
                                ],
                                function(err, userWallet) {
                                    updateUserWallet(userWallet)
                                        .then(updatedUserWallet => {
                                            if (i == accounts.length-1){
                                                callback(null, 'some parameter');
                                            }
                                        })
                                })
                            })

                        },
                        function(arg1, callback) {
                            findAllUserProviderList(user.id)
                                .then(userProviderList => {
                                    callback(null, userProviderList);
                                })
                        }
                    ],
                    function(err, userProviderList) {
                        res
                            .status(200)
                            .send({
                                userProviderList
                            })
                    })    
                }
            });
    })    
})

router.post('/api/accounts/user-addresses-insert', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { coinAddresses } = body

    if ( !coinAddresses ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        console.log('Address type is : ' + WAValidator.getAddressType('3CDJNfdWX8m2NwuGUV3nhXHXEeLygMXoAj'))
        blockexplorer.getAddress(coinAddresses)
            .then(address => {
                //console.log('address JSON : ' + JSON.stringify(address))
                async.waterfall([
                    function(callback) {
                        //console.log('function 1')
                        findUserAddressByAddress(user.id, coinAddresses)
                            .then(userAddress => {
                                if (userAddress) {
                                    userAddress.balance = address.final_balance
                                    callback(null, userAddress);
                                } else {
                                    userAddress = UserAddress.build({address: coinAddresses, nickName: coinAddresses, balance: address.final_balance, currency: 'BTC'})
                                    userAddress.setUser(user, {save: false})
                                    callback(null, userAddress);
                                }
                            })
                    },
                    function(userAddress, callback) {
                        //console.log('function 2')
                        updateUserAddress(userAddress)
                            .then(updatedUserAddress => {
                                callback(null, updatedUserAddress);
                            })
                    },
                    function(userAddress, callback) {
                        //console.log('function 3')
                        address.txs.forEach(function(trx, i) {
                            //console.log('transaction JSON : ' + JSON.stringify(trx))
                            async.waterfall([
                                function(callback) {
                                    findTransactionByTrxId(trx.tx_index)
                                        .then(transactionObj => {
                                            if (transactionObj) {
                                                transactionObj.destination = 'some address1'
                                                var utcSeconds = trx.time;
                                                var trx_date = new Date(utcSeconds*1000); // The 0 there is the key, which sets the date to the epoch
                                                var moment_date1 = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
                                                transactionObj.transactionDate = moment_date1
                                                //console.log('momemnt1 date is : ' + moment.unix(utcSeconds))
                                                //console.log('momemnt2 date is : ' + moment.unix(utcSeconds*1000))
                                                //console.log('momemnt3 date is : ' + moment(utcSeconds))
                                                //console.log('momemnt4 date is : ' + moment(utcSeconds*1000))
                                                //transactionObj.updated_at = trx_date
                                                //transactionObj.amount = acct.balance.amount
                                                //transactionObj.asset = acct.currency.code
                                                //transactionObj.value = acct.currency.code
                                                callback(null, transactionObj);
                                            } else {
                                                //transactionObj = Transaction.build({trxId: trx.tx_index, destination: acct.id, 
                                                //    note: acct.name, amount: acct.type, asset: acct.balance.amount, 
                                                //    value: acct.currency.code})
                                                var utcSeconds = trx.time;
                                                var trx_date = new Date(utcSeconds*1000); // The 0 there is the key, which sets the date to the epoch
                                                var moment_date1 = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")

                                                transactionObj = Transaction.build({trxId: trx.tx_index, destination: 'some address', transactionDate: moment_date1})
                                                transactionObj.setUser(user, {save: false})
                                                transactionObj.setUseraddress(userAddress, {save: false})
                                                findTransactionTypeById(1)
                                                    .then(transactionTypeObj => {
                                                        transactionObj.setTransactiontype(transactionTypeObj, {save: false})
                                                        findTrxImportTypeById(2)
                                                            .then(trxImportTypeObj => {
                                                                transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
                                                                trx.out.forEach(function(trx_out, j) {
                                                                    if (trx_out.addr != coinAddresses) {
                                                                        console.log('trx_out.addr : ' + trx_out.addr)
                                                                        findAssociatedAddByAdd(trx_out.addr)
                                                                            .then(associatedAddObj => {
                                                                                if (associatedAddObj) {
                                                                                    transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
                                                                                    callback(null, transactionObj);
                                                                                } else {
                                                                                    associatedAddObj = AssociatedAddress.build({address: trx_out.addr, nickName: trx_out.addr})
                                                                                    updateAssociatedAdd(associatedAddObj)
                                                                                        .then(updatedAssociatedAdd => {
                                                                                            transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
                                                                                            callback(null, transactionObj);
                                                                                        })
                                                                                }
                                                                            })
                                                                    }
                                                                })
                                                            })
                                                    })
                                            }
                                        })
                                }
                            ],
                            function(err, transactionObj) {
                                //console.log('function 4')
                                updateTransaction(transactionObj)
                                    .then(updatedTransaction => {
                                        if (i == address.txs.length-1){
                                            callback(null, 'some parameter');
                                        }
                                    })
                            })
                        })
                    },
                    function(arg1, callback) {
                        //console.log('function 5')
                        findAllUserAddresses(user.id)
                            .then(userAddressesList => {
                                callback(null, userAddressesList);
                            })
                    }
                ],
                function(err, userAddressesList) {
                    //console.log('function 6')
                    res
                        .status(200)
                        .send({
                            userAddressesList
                        })
                })
            })
            .catch(error => {
                console.log('error here. ' + error)
                caughtError(res, error)
            })
    }
})

router.post('/api/accounts/user-addresses-refresh', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { userAddressId } = body

    if ( !userAddressId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        findUserAddressById(userAddressId)
            .then(userAddress => {
                if (userAddress) {
                    findAllUserAddresses(user.id)
                        .then(userAddressesList => {
                            res
                                .status(200)
                                .send({
                                    userAddressesList
                                })
                            })
                        .catch(error => {
                            caughtError(res, error)
                        })
                } else {
                    res
                        .status(400)
                        .send({
                            message: 'Address not found'
                    })
                }
            })
            .catch(error => {
                caughtError(res, error)
            })
    }
})

router.post('/api/accounts/user-address-delete', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { userAddressId } = body

    if ( !userAddressId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        deleteUserAddressById(userAddressId)
        .then(result => {
            if (result) {
                findAllUserAddresses(user.id)
                    .then(userAddressesList => {
                        res
                            .status(200)
                            .send({
                                userAddressesList
                            })
                        })
                    .catch(error => {
                        caughtError(res, error)
                    })
            } else {
                res
                .status(400)
                .send({
                    message: 'Something went wrong, Please try again'
                })
            }
        })
    }
})

router.post('/api/accounts/user-address-update', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { userAddressId, userAddressNickName } = body

    if ( !userAddressId || !userAddressNickName ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        findUserAddressById(userAddressId)
            .then(userAddress => {
                if (userAddress) {
                    userAddress.nickName = userAddressNickName
                    updateUserAddress(userAddress)
                        .then(updatedUserAddress => {
                            findAllUserAddresses(user.id)
                                .then(userAddressesList => {
                                    res
                                        .status(200)
                                        .send({
                                            userAddressesList
                                        })
                                })
                                .catch(error => {
                                    caughtError(res, error)
                                })
                        })
                        .catch(error => {
                            caughtError(res, error)
                        })    
                } else {
                    res
                        .status(400)
                        .send({
                            message: 'Address not found'
                    })
                }
            })
            .catch(error => {
                caughtError(res, error)
            })
    }
})

router.post('/api/accounts/associated-myaddress-update', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { associatedAddId, associatedAddNick } = body

    if ( !associatedAddId || !associatedAddNick ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        findAssociatedAddById(associatedAddId)
            .then(associatedAdd => {
                if (associatedAdd) {
                    associatedAdd.nickName = associatedAddNick
                    updateAssociatedAdd(associatedAdd)
                        .then(updatedUserAddress => {
                            findAllUserAddresses(user.id)
                                .then(userAddressesList => {
                                    res
                                        .status(200)
                                        .send({
                                            userAddressesList
                                        })
                                })
                                .catch(error => {
                                    caughtError(res, error)
                                })
                        })
                        .catch(error => {
                            caughtError(res, error)
                        })    
                } else {
                    res
                        .status(400)
                        .send({
                            message: 'Address not found'
                    })
                }
            })
            .catch(error => {
                caughtError(res, error)
            })
    }
})

router.post('/api/accounts/associated-walletaddress-update', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { associatedAddId, associatedAddNick } = body

    if ( !associatedAddId || !associatedAddNick ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    if (user) {
        findAssociatedAddById(associatedAddId)
            .then(associatedAdd => {
                if (associatedAdd) {
                    associatedAdd.nickName = associatedAddNick
                    updateAssociatedAdd(associatedAdd)
                        .then(updatedUserAddress => {
                            findAllUserProviderList(user.id)
                                .then(userProviderList => {
                                    res
                                        .status(200)
                                        .send({
                                            userProviderList
                                        })
                                })
                                .catch(error => {
                                    caughtError(res, error)
                                })
                        })
                        .catch(error => {
                            caughtError(res, error)
                        })    
                } else {
                    res
                        .status(400)
                        .send({
                            message: 'Address not found'
                    })
                }
            })
            .catch(error => {
                caughtError(res, error)
            })
    }
})

export default router