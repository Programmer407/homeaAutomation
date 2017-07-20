// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import UserProvider from './../../models/UserProvider'
import UserWallet from './../../models/UserWallet'
import { findAllProviderList, findProviderByName } from '../../managers/providerManager'
import { insertUserProvider } from '../../managers/userProviderManager'
import { findUserByID } from '../../managers/userManager'
import { insertUserWallet } from '../../managers/userWalletManager'

const router = express.Router()

router.get('/api/accounts/my-account-all-providers', (req, res) => {
    const {user} = req
    console.log('logged in user is : ' + JSON.stringify(user))
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

router.get('/api/accounts/my-account-connect', (req, res) => {
    console.log('my-account-connect called.')
    const {user} = req
    console.log('logged in user is : ' + JSON.stringify(user))
    let callBackUrl = encodeURIComponent('http://localhost/account/coinbase/callback')
    console.log('callBackUrl : ' + callBackUrl)
    let redirectUrl = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id=45a38875c5f7a2563c36cf347ebef69d428bbee77d6d9ece0878f1f54fb92f78&redirect_uri='+callBackUrl+'&state=134ef5504a942&scope=wallet:user:read,wallet:accounts:read'
    console.log('redirectUrl : ' + redirectUrl)
    
    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //res.redirect(redirectUrl)
    //res.redirect('http://www.yahoo.com')
    
    res
        .status(200)
        .send({
        redirecturl: redirectUrl
    })
})

router.post('/api/accounts/coinbase-wallets', (req, res) => {
    //console.log('req is : ' + JSON.stringify(req))
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }

    //const { email, password, rememberMe } = body
    const { accessToken, refreshTokan, providerName } = body

    if ( !accessToken || !refreshTokan || !providerName ) {
        res
            .status(400)
            .send({
                message: 'Missing required arguments'
        })
    }
    console.log('refreshTokan : ' + refreshTokan)
    const userProviderObj = UserProvider.build({accountName: '', accessToken: accessToken, refreshTokan: refreshTokan})

    findUserByID(user.id)
        .then(userObj => {
            if (userObj) {
                userProviderObj.setUser(userObj, {save: false})
                findProviderByName(providerName)
                    .then(providerObj => {
                        if (providerObj) {
                            userProviderObj.setProvider(providerObj, {save: false})
                            insertUserProvider(userProviderObj)
                                .then(userProvider => {
                                    if (userProvider) {
                                        var Client = require('coinbase').Client;
                                        var client = new Client({'accessToken': accessToken, 'refreshToken': refreshTokan});
                                        client.getAccounts({}, function(err, accounts) {
                                            accounts.forEach(function(acct) {
                                                console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name + ' In Currency : ' + JSON.stringify(acct.currency));
                                                const userWalletObj = UserWallet.build({walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                userWalletObj.setUserprovider(userProvider, {save: false})
                                                insertUserWallet(userWalletObj)
                                                    .then(userWallet => {
                                                        console.log('wallet inserted')
                                                        client.getAccount(acct.id, function(err, account) {
                                                            account.getTransactions(function(err, txs) {
                                                                console.log(txs);
                                                            });
                                                        });
                                                    })
                                            });
                                        });

                                        res
                                            .status(200)
                                            .send({
                                                message: 'Successful!'
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
})

export default router