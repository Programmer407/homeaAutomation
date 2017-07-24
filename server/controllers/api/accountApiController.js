// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import UserProvider from './../../models/UserProvider'
import UserWallet from './../../models/UserWallet'
import { findProviderByID, findAllProviderList, findProviderByName } from '../../managers/providerManager'
import { insertUserProvider, updateUserProvider, findUserProviderByID, findUserProviderByAccountName, findAllUserProviderList } from '../../managers/userProviderManager'
//import { insertUserProvider, updateUserProvider, findUserProviderByID, findUserProviderByAccountName } from '../../managers/userProviderManager'
import { findUserByID } from '../../managers/userManager'
import { insertUserWallet, updateUserWallet, findUserWalletByWalletId } from '../../managers/userWalletManager'

const router = express.Router()

router.get('/api/accounts/my-account-all-providers', (req, res) => {
    const {user} = req
    if (user) {
        findAllProviderList()
            .then(providerList => {
                res
                    .status(200)
                    .send({
                        providerList
                    })
            })
            .catch(error => {
                //caughtError(res, error)
                res
                .status(500)
                .send({
                    message: 'Something went wrong, Please try again'
                })
            })
    }
})

router.get('/api/accounts/my-account-all-userwallets', (req, res) => {
    const {user} = req
    if (user) {
        findAllUserProviderList(user.id)
            .then(userProviderList => {
                res
                    .status(200)
                    .send({
                        userProviderList
                    })
            })
            .catch(error => {
                //caughtError(res, error)
                res
                .status(500)
                .send({
                    message: 'Something went wrong, Please try again'
                })
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
                    var callBackUrl = req.protocol + '://' + req.get('host') + providerObj.redirectUrl1
                    //console.log('callBackUrl : ' + callBackUrl)
                    let encodedCallBackUrl = encodeURIComponent(callBackUrl)
                    let redirectUrl = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+providerObj.clientId+'&redirect_uri='+encodedCallBackUrl+'&scope=wallet:user:read,wallet:accounts:read'
                   // console.log('redirectUrl : ' + redirectUrl)
                    res
                        .status(200)
                        .send({
                        redirecturl: redirectUrl
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
            res
                .status(400)
                .send({
                    message: 'Something went wrong, Please try again'
                })
        })
})

router.post('/api/accounts/my-account-provider-info', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { providerName } = body

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
                res
                    .status(200)
                    .send({
                        providerObj: providerObj
                    })
            } else {
                res
                .status(400)
                .send({
                    message: 'Provider not found'
                })
            }
        })
        .catch(error => {
            res
                .status(400)
                .send({
                    message: 'Something went wrong, Please try again'
                })
        })
})

router.post('/api/accounts/insert-userprovider', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    const { accessToken, refreshToken, providerId } = body

    if ( !accessToken || !refreshToken || !providerId ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    //console.log('refreshToken : ' + refreshToken)
    
    var Client = require('coinbase').Client;
    var client = new Client({'accessToken': accessToken, 'refreshToken': refreshToken});
    client.getCurrentUser(function(err, accountUser) {
        //console.log('current user is : ' + JSON.stringify(accountUser));
        //console.log('current user is : ' + JSON.stringify(accountUser.id));
        
        findUserProviderByAccountName(accountUser.id)
            .then(userProvider => {
                if (userProvider) {
                    //console.log('userprovider account exist in the system')
                    userProvider.accessToken = accessToken
                    userProvider.refreshToken = refreshToken
                    updateUserProvider(userProvider)
                        .then(updatedUserProvider => {
                            res
                                .status(200)
                                .send({
                                    userProvider: updatedUserProvider
                                })
                        })
                } else {
                    //console.log('userprovider account does not exist in the system')
                    const userProviderObj = UserProvider.build({accountName: accountUser.id, accessToken: accessToken, refreshToken: refreshToken})

                    findUserByID(user.id)
                        .then(userObj => {
                            if (userObj) {
                                userProviderObj.setUser(userObj, {save: false})
                                findProviderByID(providerId)
                                    .then(providerObj => {
                                        if (providerObj) {
                                            userProviderObj.setProvider(providerObj, {save: false})
                                            insertUserProvider(userProviderObj)
                                                .then(userProvider => {
                                                    if (userProvider) {
                                                        res
                                                            .status(200)
                                                            .send({
                                                                userProvider: userProvider
                                                        })
                                                    } else {
                                                        res
                                                            .status(400)
                                                            .send({
                                                                message: 'Something went wrong, Please try again'
                                                            })
                                                    }
                                                })
                                        } else {
                                            res
                                                .status(400)
                                                .send({
                                                    message: 'Something went wrong, Please try again'
                                                })
                                        }
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
    });  
})

router.post('/api/accounts/update-userprovider-wallets', (req, res) => {
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
            if (userProviderObj) {
                var Client = require('coinbase').Client;
                var client = new Client({'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken});
                client.getAccounts({}, function(err, accounts) {
                    accounts.forEach(function(acct) {
                        console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name + ' In Currency : ' + JSON.stringify(acct.currency));
                        findUserWalletByWalletId(acct.id)
                            .then(userWallet => {
                                if (userWallet) {
                                    userWallet.walletName = acct.name
                                    userWallet.walletType = acct.type
                                    userWallet.balance = acct.balance.amount
                                    userWallet.currency = acct.currency.code
                                    updateUserWallet(userWallet)
                                        .then(updatedUserWallet => {
                                            console.log('wallet updated')
                                        })
                                } else {
                                    const userWalletObj = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                    userWalletObj.setUserprovider(userProviderObj, {save: false})
                                    insertUserWallet(userWalletObj)
                                        .then(insertedUserWallet => {
                                            console.log('wallet inserted')
                                        })
                                }
                            });
                    });
                });
                res
                    .status(200)
                    .send({
                        message: 'Wallet inserted/updated'
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

export default router