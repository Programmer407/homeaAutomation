// libs
import express from 'express'
import async from 'async';
var request = require('request');
import coinBaseService from '../../services/CoinBaseService'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import UserProvider from './../../models/UserProvider'
import UserWallet from './../../models/UserWallet'
import UserAddress from './../../models/UserAddress'
import { findProviderByID, findAllProviderList, findProviderByName } from '../../managers/providerManager'
import { insertUserProvider, updateUserProvider, findUserProviderByID, findUserProviderByAccountName, findAllUserProviderList } from '../../managers/userProviderManager'
import { findUserByID } from '../../managers/userManager'
import { insertUserWallet, updateUserWallet, findUserWalletByWalletId, deleteUserWalletById } from '../../managers/userWalletManager'
import { findAllUserAddresses, findUserAddressByAddress, findUserAddressById, insertUserAddress, updateUserAddress, deleteUserAddressById } from '../../managers/userAddressesManager'

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
                caughtError(res, error)
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
            caughtError(res, error)
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
        if (err && !accountUser) {
            console.log('there are errors : ' + err)
            findProviderByID(providerId)
                .then(providerObj => {
                    
                    var headers = {
                        'User-Agent':       'Super Agent/0.0.1',
                        'Content-Type':     'application/x-www-form-urlencoded'
                    }

                    // Configure the request
                    var options = {
                        url: 'https://api.coinbase.com/oauth/token',
                        method: 'POST',
                        form: {'grant_type': 'refresh_token', 
                            'client_id': providerObj.clientId,
                            'client_secret': providerObj.clientSecret,
                            'refresh_token': refreshToken}
                    }

                    // Start the request
                    request(options, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            // Print out the response body
                            console.log('body 1 : ' + body)
                            client = new Client({'accessToken': body.access_token, 'refreshToken': body.refresh_token});
                            client.getCurrentUser(function(err, accountUser) {
                                findUserProviderByAccountName(accountUser.id)
                                    .then(userProvider => {
                                        if (userProvider) {
                                            //console.log('userprovider account exist in the system')
                                            userProvider.accessToken = body.access_token
                                            userProvider.refreshToken = body.refresh_token
                                            updateUserProvider(userProvider)
                                                .then(updatedUserProvider => {
                                                    res
                                                        .status(200)
                                                        .send({
                                                            userProvider: updatedUserProvider
                                                        })
                                                })
                                        }
                                    })
                            })
                        }
                    })
                })
        } else {
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
        }
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
                        //console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name + ' In Currency : ' + JSON.stringify(acct.currency));
                        findUserWalletByWalletId(acct.id)
                            .then(userWallet => {
                                if (userWallet) {
                                    userWallet.walletName = acct.name
                                    userWallet.walletType = acct.type
                                    userWallet.balance = acct.balance.amount
                                    userWallet.currency = acct.currency.code
                                    updateUserWallet(userWallet)
                                        .then(updatedUserWallet => {
                                            //console.log('wallet updated')
                                        })
                                } else {
                                    const userWalletObj = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                    userWalletObj.setUserprovider(userProviderObj, {save: false})
                                    insertUserWallet(userWalletObj)
                                        .then(insertedUserWallet => {
                                            //console.log('wallet inserted')
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

    /*async.waterfall([
        async.apply(UserService.getUser, userProps, params),
        async.apply(FogTypeService.getFogTypeDetail, fogTypeProps),
        async.apply(FogService.createFogInstance, createFogProps),
        async.apply(ChangeTrackingService.createFogChangeTracking, createChangeTrackingProps),
        async.apply(FogUserService.createFogUser, createFogUserProps)
    ], function(err, result) {
        console.log('result is : ' + result)
    });*/

    /*async.waterfall([
        function(callback) {
            console.log('fuction 1')
            findAllUserProviderList(user.id)
                .then(userProviderList => {
                    callback(null, 'one');
                })
        },
        function(arg1, callback) {
            console.log('fuction 2')
            // arg1 now equals 'three'
            callback(null, 'done');
        }
    ], function (err, result) {
        // result now equals 'done'
        console.log('result function')
    });*/

    

    findUserProviderByID(userProviderId)
        .then(userProviderObj => {
            console.log('userProviderObj.provider.clientId : ' + userProviderObj.provider.clientId)
            var Client = require('coinbase').Client;
            var client = new Client({'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken});
            client.getAccounts({}, function(err, accounts) {
                if (err) {
                    console.log('err is : ' + err)
                    if (err == 'RevokedToken: The access token was revoked') {
                        let redirectURL = coinBaseService.getCoinBaseRedirectURL(userProviderObj.provider, req)
                        return res
                            .status(200)
                            .send({
                                redirecturl: redirectURL
                            })
                    } else {
                        // Configure the request
                        console.log('userProviderObj.provider.clientId : ' + userProviderObj.provider.clientId)
                        console.log('userProviderObj.provider.clientSecret : ' + userProviderObj.provider.clientSecret)
                        console.log('userProviderObj.refreshToken : ' + userProviderObj.refreshToken)
                        var options = {
                            url: 'https://api.coinbase.com/oauth/token',
                            method: 'POST',
                            form: {'grant_type': 'refresh_token', 
                                'client_id': userProviderObj.provider.clientId,
                                'client_secret': userProviderObj.provider.clientSecret,
                                'refresh_token': userProviderObj.refreshToken}
                        }

                        // Start the request
                        request(options, function (error, response, body) {
                            console.log('error : ' + error)
                            console.log('response : ' + JSON.stringify(response))
                            console.log('body : ' + body)
                            if (!error && response.statusCode == 200) {
                                // Print out the response body
                                userProviderObj.accessToken = body.access_token
                                userProviderObj.refreshToken = body.refresh_token
                                updateUserProvider(userProviderObj)
                                    .then(updatedUserProvider => {
                                        client = new Client({'accessToken': updatedUserProvider.accessToken, 'refreshToken': updatedUserProvider.refreshToken});
                                        client.getAccounts({}, function(err, accounts) {
                                            /*accounts.forEach(function(acct) {
                                                /*findUserWalletByWalletId(acct.id)
                                                    .then(userWallet => {
                                                        if (userWallet) {
                                                            userWallet.walletName = acct.name
                                                            userWallet.walletType = acct.type
                                                            userWallet.balance = acct.balance.amount
                                                            userWallet.currency = acct.currency.code
                                                            updateUserWallet(userWallet)
                                                        } else {
                                                            const userWalletObj = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                            userWalletObj.setUserprovider(userProviderObj, {save: false})
                                                            insertUserWallet(userWalletObj)
                                                        }
                                                    });
                                            });*/
                                            async.waterfall([
                                                function(callback) {
                                                    //console.log('fuction 1')
                                                    accounts.forEach(function(acct, i) {
                                                        //console.log('INDEX : ' + i + ' SIZE is : ' + accounts.length)
                                                        async.waterfall([
                                                            function(callback) {
                                                                findUserWalletByWalletId(acct.id)
                                                                    .then(userWallet => {
                                                                        if (userWallet) {
                                                                            //console.log('index inside (if): ' + i)
                                                                            userWallet.walletName = acct.name
                                                                            userWallet.walletType = acct.type
                                                                            userWallet.balance = acct.balance.amount
                                                                            userWallet.currency = acct.currency.code
                                                                            callback(null, userWallet);
                                                                        } else {
                                                                            //console.log('index inside (el): ' + i)
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
                                                                    //console.log('index most inside : ' + i)
                                                                    if (i == accounts.length-1){
                                                                        callback(null, 'some parameter');
                                                                    }
                                                                })
                                                        })
                                                    })

                                                },
                                                function(arg1, callback) {
                                                    //console.log('fuction 2')
                                                    findAllUserProviderList(user.id)
                                                        .then(userProviderList => {
                                                            callback(null, userProviderList);
                                                        })
                                                }
                                            ],
                                            function(err, userProviderList) {
                                                //console.log('result is ' + userProviderList)
                                                res
                                                    .status(200)
                                                    .send({
                                                        userProviderList
                                                    })
                                            })
                                        })
                                        /*findAllUserProviderList(user.id)
                                            .then(userProviderList => {
                                                res
                                                    .status(200)
                                                    .send({
                                                        userProviderList
                                                    })
                                            })
                                            .catch(error => {
                                                caughtError(res, error)
                                            })*/
                                    })
                            }
                        })

                    }
                } else {
                    //console.log('not errors')
                    async.waterfall([
                        function(callback) {
                            //console.log('fuction 1')
                            accounts.forEach(function(acct, i) {
                                //console.log('INDEX : ' + i + ' SIZE is : ' + accounts.length)
                                async.waterfall([
                                    function(callback) {
                                        findUserWalletByWalletId(acct.id)
                                            .then(userWallet => {
                                                if (userWallet) {
                                                    //console.log('index inside (if): ' + i)
                                                    userWallet.walletName = acct.name
                                                    userWallet.walletType = acct.type
                                                    userWallet.balance = acct.balance.amount
                                                    userWallet.currency = acct.currency.code
                                                    callback(null, userWallet);
                                                } else {
                                                    //console.log('index inside (el): ' + i)
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
                                            //console.log('index most inside : ' + i)
                                            if (i == accounts.length-1){
                                                callback(null, 'some parameter');
                                            }
                                        })
                                })
                            })

                        },
                        function(arg1, callback) {
                            //console.log('fuction 2')
                            findAllUserProviderList(user.id)
                                .then(userProviderList => {
                                    callback(null, userProviderList);
                                })
                        }
                    ],
                    function(err, userProviderList) {
                        //console.log('result is ' + userProviderList)
                        res
                            .status(200)
                            .send({
                                userProviderList
                            })
                    })

                    /*accounts.forEach(function(acct, i) {
                        console.log('INDEX : ' + i + ' SIZE is : ' + accounts.length)
                        findUserWalletByWalletId(acct.id)
                            .then(userWallet => {
                                console.log('index inside : ' + i)
                                if (userWallet) {
                                    userWallet.walletName = acct.name
                                    userWallet.walletType = acct.type
                                    userWallet.balance = acct.balance.amount
                                    userWallet.currency = acct.currency.code
                                } else {
                                    userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                    userWallet.setUserprovider(userProviderObj, {save: false})
                                }
                                updateUserWallet(userWallet)
                                    .then(updatedUserWallet => {
                                        console.log('index most inside : ' + i)
                                    })
                                //insertUserWallet(userWalletObj)
                            });
                    });*/
                    //console.log('called')
                    /*findAllUserProviderList(user.id)
                        .then(userProviderList => {

                            res
                                .status(200)
                                .send({
                                    userProviderList
                                })
                        })
                        .catch(error => {
                            caughtError(res, error)
                        })    */
                }
            });
    })
})

/*router.post('/api/accounts/refresh-userproviders', (req, res) => {
    const { body, user } = req

    if ( !body ) {
        res
            .status(400)
            .send({
                message: 'Missing request body'
        })
    }
    findAllUserProviderList(user.id)
        .then(userProviderList => {
            userProviderList.forEach(function(userProviderObj) {
                if (userProviderObj.provider.id = 1) {
                    console.log('its coinbase')
                    var Client = require('coinbase').Client;
                    var client = new Client({'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken});
                    /*
                        console.log('err is : ' + err)
                            console.log('accounts : ' + accounts)
                            var headers = {
                                'User-Agent':       'Super Agent/0.0.1',
                                'Content-Type':     'application/x-www-form-urlencoded'
                            }

                            // Configure the request
                            var options = {
                                url: 'https://api.coinbase.com/oauth/revoke',
                                method: 'POST',
                                headers: headers,
                                form: {'token': 'aaee094a50f2e120ed0cd94d7ce9143c5a29bcc06a11d8d5633f78153b4c9446'}
                            }

                            // Start the request
                            request(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    // Print out the response body
                                    console.log('body 1 : ' + body)
                                    console.log('body 2 : ' + JSON.stringify(body))
                                    console.log('response 1 : ' + response)
                                    console.log('response 2 : ' + JSON.stringify(response))
                                } else {
                                    console.log('there are errors : ' + error)
                                }
                            })
*/

/*                    client.getAccounts({}, function(err, accounts) {
                        if (err && !accounts) {
                            if (err == 'RevokedToken: The access token was revoked') {
                                console.log('revoke error')
                                let redirectURL = coinBaseService.getCoinBaseRedirectURL(userProviderObj.provider, req)
                                console.log('newRedirectURL : ' + redirectURL)
                                return res
                                    .status(200)
                                    .send({
                                    redirecturl: redirectURL
                                })
                            } else {
                                console.log('err is : ' + err)
                                //console.log('accounts : ' + accounts)
                                /*var headers = {
                                    'User-Agent':       'Super Agent/0.0.1',
                                    'Content-Type':     'application/x-www-form-urlencoded'
                                }*/

                                // Configure the request
/*                                var options = {
                                    url: 'https://api.coinbase.com/oauth/token',
                                    method: 'POST',
                                    form: {'grant_type': 'refresh_token', 
                                            'client_id': userProviderObj.provider.clientId,
                                            'client_secret': userProviderObj.provider.clientSecret,
                                            'refresh_token': userProviderObj.refreshToken}
                                }

                                // Start the request
                                request(options, function (error, response, body) {
                                    console.log('error : ' + error)
                                    console.log('response : ' + JSON.stringify(response))
                                    console.log('body : ' + body)
                                    if (!error && response.statusCode == 200) {
                                        // Print out the response body
                                        console.log('body 1 : ' + body)
                                        userProviderObj.accessToken = body.access_token
                                        userProviderObj.refreshToken = body.refresh_token
                                        updateUserProvider(userProviderObj)
                                            .then(updatedUserProvider => {
                                                client = new Client({'accessToken': updatedUserProvider.accessToken, 'refreshToken': updatedUserProvider.refreshToken});
                                                client.getAccounts({}, function(err, accounts) {
                                                    accounts.forEach(function(acct) {
                                                    findUserWalletByWalletId(acct.id)
                                                        .then(userWallet => {
                                                            if (userWallet) {
                                                                userWallet.walletName = acct.name
                                                                userWallet.walletType = acct.type
                                                                userWallet.balance = acct.balance.amount
                                                                userWallet.currency = acct.currency.code
                                                                updateUserWallet(userWallet)
                                                            } else {
                                                                const userWalletObj = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                                                userWalletObj.setUserprovider(userProviderObj, {save: false})
                                                                insertUserWallet(userWalletObj)
                                                            }
                                                        });
                                                    });
                                                })
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
                                    } else {
                                        console.log('there are errors : ' + error)
                                        res
                                            .status(400)
                                            .send({
                                                message: 'Something went wrong, Please try again'
                                            })
                                    }
                                })
                            }
                        } else {
                            console.log('there are no errors')
                            accounts.forEach(function(acct) {
                                findUserWalletByWalletId(acct.id)
                                    .then(userWallet => {
                                        if (userWallet) {
                                            userWallet.walletName = acct.name
                                            userWallet.walletType = acct.type
                                            userWallet.balance = acct.balance.amount
                                            userWallet.currency = acct.currency.code
                                            updateUserWallet(userWallet)
                                        } else {
                                            const userWalletObj = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
                                            userWalletObj.setUserprovider(userProviderObj, {save: false})
                                            insertUserWallet(userWalletObj)
                                        }
                                    });
                            });
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
                        }
                    });
                }
            })
        })
        .catch(error => {
            caughtError(res, error)
        })
})*/

router.get('/api/accounts/user-addresses-list', (req, res) => {
    const {user} = req
    if (user) {
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
    }
})

router.post('/api/accounts/insert-user-addresses', (req, res) => {
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
        findUserAddressByAddress(user.id, coinAddresses)
            .then(userAddress => {
                if (userAddress) {
                    userAddress.address = coinAddresses
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
                } else {
                    const userAddressObj = UserAddress.build({address: coinAddresses, nickName: 'test nickname', balance: '20', currency: 'BTC'})
                    userAddressObj.setUser(user, {save: false})
                    insertUserAddress(userAddressObj)
                        .then(insertedUserAddress => {
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
                }
            })
            .catch(error => {
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

export default router