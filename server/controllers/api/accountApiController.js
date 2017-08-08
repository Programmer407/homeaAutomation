// libs
import express from 'express'
import async from 'async';
import moment from 'moment';
var request = require('request');
import coinBaseService from '../../services/CoinBaseService'
import blockexplorer from 'blockchain.info/blockexplorer'
import WAValidator from 'wallet-address-validator';
import isNil from 'lodash/isNil'

// src
import { ensureAnonymity, caughtError, bindEntityApiRoutes, ensureAuthorization, rejectRequest } from '../../utils'
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

router.get('/api/accounts/my-account-all-data', ensureAuthorization, (req, res) => {
    const { user } = req

    Promise.all([ findAllProviderList(), findAllUserProviderList(user.id), findAllUserAddresses(user.id) ])
        .then(([providerList, userProviderList, userAddressesList]) => {
            res.send({ providerList, userProviderList, userAddressesList })
        })
        .catch(error => {
            caughtError(res, error)
        })
})

router.post('/api/accounts/my-account-connect-url', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { providerId } = body
    if ( !providerId ) {
    	rejectRequest('Missing required arguments', res)
    	return;
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

router.post('/api/accounts/wallet-provider-callback', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { providerName, tokenCode } = body
    if ( !providerName ) {
      rejectRequest('Missing required arguments', res)
    	return;
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
																async.eachOfSeries(accounts, function(acct, key, nextCallback) {
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
																					/*if (key == accounts.length-1){
																						callback(null, 'some parameter');
																					} else {
																						nextCallback();
																					}*/
																					acct.getTransactions({}, function(transactionsErr, txs) {
																						if (transactionsErr) {
																							caughtError(res, transactionsErr)
																						} else {
																							async.eachOfSeries(txs, function(trans, key1, transCallback) {
																							findTransactionByTrxId(trans.id)
																								.then(transactionObj => {
																									var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
																									var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
																									if (transactionObj) {
																										if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																											transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
																											transactionObj.amount = trans.amount.amount;
																											transactionObj.asset = trans.amount.currency;
																											transactionObj.value = trans.native_amount.amount;
																											transactionObj.transactionDate = moment_date
																											let transType = 2
																											if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to))) {
																												transType = 3
																											}
																											findTransactionTypeById(transType)
																												.then(transactionTypeObj => {
																													transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																													findTrxImportTypeById(1)
																														.then(trxImportTypeObj => {
																															transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																															if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																																findAssociatedAddByAdd(trans.to.address)
																																	.then(associatedAddObj => {
																																		if (associatedAddObj) {
																																			transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																																				updateTransaction(transactionObj)
																																					.then(updatedTransaction => {
																																						if (key1 == txs.length-1) {
																																							if (key == accounts.length-1){
																																									callback(null, 'some parameter');
																																							} else {
																																									nextCallback();
																																							}
																																						} else {
																																							transCallback()
																																						}
																																					})
																																		} else {
																																			associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																																			updateAssociatedAdd(associatedAddObj)
																																				.then(updatedAssociatedAdd => {
																																					transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																																					updateTransaction(transactionObj)
																																						.then(updatedTransaction => {
																																							if (key1 == txs.length-1) {
																																								if (key == accounts.length-1){
																																									callback(null, 'some parameter');
																																								} else {
																																									nextCallback();
																																								}
																																							} else {
																																								transCallback()
																																							}
																																						})
																																				})
																																		}
																																	})
																															} else {
																																updateTransaction(transactionObj)
																																	.then(updatedTransaction => {
																																		if (key1 == txs.length-1) {
																																			if (key == accounts.length-1){
																																				callback(null, 'some parameter');
																																			} else {
																																				nextCallback();
																																			}
																																		} else {
																																			transCallback()
																																		}
																																	})
																															}
																														})
																												})
																										} else {
																											if (key1 == txs.length-1) {
																												if (key == accounts.length-1){
																													callback(null, 'some parameter');
																												} else {
																													nextCallback();
																												}
																											} else {
																												transCallback()
																											}
																										}
																									} else {
																										if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																											transactionObj = Transaction.build({trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount:trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount})
																											transactionObj.setUser(user, {save: false})
																											transactionObj.setUserwallet(updatedUserWallet, {save: false})
																											findTransactionTypeById(2)
																												.then(transactionTypeObj => {
																													let transType = 2
																													if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to))) {
																														transType = 3
																													}
																													findTransactionTypeById(transType)
																													transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																													findTrxImportTypeById(1)
																														.then(trxImportTypeObj => {
																															transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																															if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																																findAssociatedAddByAdd(trans.to.address)
																																	.then(associatedAddObj => {
																																		if (associatedAddObj) {
																																			transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																																			updateTransaction(transactionObj)
																																				.then(updatedTransaction => {
																																					if (key1 == txs.length-1) {
																																						if (key == accounts.length-1){
																																							callback(null, 'some parameter');
																																						} else {
																																							nextCallback();
																																						}
																																					} else {
																																						transCallback()
																																					}
																																				})
																																		} else {
																																			associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																																			updateAssociatedAdd(associatedAddObj)
																																				.then(updatedAssociatedAdd => {
																																					transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																																					updateTransaction(transactionObj)
																																						.then(updatedTransaction => {
																																							if (key1 == txs.length-1) {
																																								if (key == accounts.length-1){
																																									callback(null, 'some parameter');
																																								} else {
																																									nextCallback();
																																								}
																																							} else {
																																								transCallback()
																																							}
																																						})
																																				})
																																		}
																																	})
																															} else {
																																updateTransaction(transactionObj)
																																	.then(updatedTransaction => {
																																		if (key1 == txs.length-1) {
																																				if (key == accounts.length-1){
																																						callback(null, 'some parameter');
																																				} else {
																																						nextCallback();
																																				}
																																		} else {
																																				transCallback()
																																		}
																																	})
																															}
																														})
																												})
																										} else {
																											if (key1 == txs.length-1) {
																												if (key == accounts.length-1){
																													callback(null, 'some parameter');
																												} else {
																													nextCallback();
																												}
																											} else {
																												transCallback()
																											}
																										}
																									}
																								})
																							})
																						}
																					});
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
									caughtError(res, error)
								}
              })
            }
          }
        } else {
					rejectRequest('Provider not found', res)
      		return;
				}
      })
      .catch(error => {
					caughtError(res, error)
			})
})

router.post('/api/accounts/delete-userprovider-wallet', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { userWalletId } = body
    if ( !userWalletId ) {
      rejectRequest('Missing required arguments', res)
    	return;
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

router.post('/api/accounts/refresh-userproviders', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { userProviderId } = body
    if ( !userProviderId ) {
    	rejectRequest('Missing required arguments', res)
      return;
    }
    
    findUserProviderByID(userProviderId)
      .then(userProviderObj => {
        var Client = require('coinbase').Client;
        var client = new Client({'accessToken': userProviderObj.accessToken, 'refreshToken': userProviderObj.refreshToken});
        client.getAccounts({}, function(err, accounts) {
          if (err) {
            console.log('err : ' + err)
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
														async.eachOfSeries(accounts, function(acct, key, nextCallback) {
															async.waterfall([
																function(callback) {
																	findUserWalletByWalletId(acct.id)
																		.then(userWallet => {
																			if (userWallet) {
																				userWallet.walletName = acct.name
																				userWallet.walletType = acct.type
																				userWallet.balance = acct.balance.amount
																				userWallet.currency = acct.currency.code
																				callback(null, userWallet, acct);
																			} else {
																				userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
																				userWallet.setUserprovider(userProviderObj, {save: false})
																				callback(null, userWallet, acct);
																			}
																		})
																}
															],
															function(err, userWallet, acct) {
																updateUserWallet(userWallet)
																	.then(updatedUserWallet => {
																		acct.getTransactions({}, function(transactionsErr, txs) {
																			if (transactionsErr) {
																				caughtError(res, transactionsErr)
																			} else {
																				async.eachOfSeries(txs, function(trans, key1, transCallback) {
																				findTransactionByTrxId(trans.id)
																					.then(transactionObj => {
																						var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
																						var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
																						if (transactionObj) {
																							if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																								transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
																								transactionObj.amount = trans.amount.amount;
																								transactionObj.asset = trans.amount.currency;
																								transactionObj.value = trans.native_amount.amount;
																								transactionObj.transactionDate = moment_date
																								let transType = 2
																								if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to))) {
																									transType = 3
																								}
																								findTransactionTypeById(transType)
																									.then(transactionTypeObj => {
																										transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																										findTrxImportTypeById(1)
																											.then(trxImportTypeObj => {
																												transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																												if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																													findAssociatedAddByAdd(trans.to.address)
																														.then(associatedAddObj => {
																															if (associatedAddObj) {
																																transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																																	updateTransaction(transactionObj)
																																		.then(updatedTransaction => {
																																			if (key1 == txs.length-1) {
																																				if (key == accounts.length-1){
																																						callback(null, 'some parameter');
																																				} else {
																																						nextCallback();
																																				}
																																			} else {
																																				transCallback()
																																			}
																																		})
																															} else {
																																associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																																updateAssociatedAdd(associatedAddObj)
																																	.then(updatedAssociatedAdd => {
																																		transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																																		updateTransaction(transactionObj)
																																			.then(updatedTransaction => {
																																				if (key1 == txs.length-1) {
																																					if (key == accounts.length-1){
																																						callback(null, 'some parameter');
																																					} else {
																																						nextCallback();
																																					}
																																				} else {
																																					transCallback()
																																				}
																																			})
																																	})
																															}
																														})
																												} else {
																													updateTransaction(transactionObj)
																														.then(updatedTransaction => {
																															if (key1 == txs.length-1) {
																																if (key == accounts.length-1){
																																	callback(null, 'some parameter');
																																} else {
																																	nextCallback();
																																}
																															} else {
																																transCallback()
																															}
																														})
																												}
																											})
																									})
																							} else {
																								if (key1 == txs.length-1) {
																									if (key == accounts.length-1){
																										callback(null, 'some parameter');
																									} else {
																										nextCallback();
																									}
																								} else {
																									transCallback()
																								}
																							}
																						} else {
																							if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																								transactionObj = Transaction.build({trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount:trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount})
																								transactionObj.setUser(user, {save: false})
																								transactionObj.setUserwallet(updatedUserWallet, {save: false})
																								findTransactionTypeById(2)
																									.then(transactionTypeObj => {
																										let transType = 2
																										if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to) && isNil(trans.to.address))) {
																											transType = 3
																										}
																										findTransactionTypeById(transType)
																										transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																										findTrxImportTypeById(1)
																											.then(trxImportTypeObj => {
																												transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																												if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																													findAssociatedAddByAdd(trans.to.address)
																														.then(associatedAddObj => {
																															if (associatedAddObj) {
																																transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																																updateTransaction(transactionObj)
																																	.then(updatedTransaction => {
																																		if (key1 == txs.length-1) {
																																			if (key == accounts.length-1){
																																				callback(null, 'some parameter');
																																			} else {
																																				nextCallback();
																																			}
																																		} else {
																																			transCallback()
																																		}
																																	})
																															} else {
																																associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																																updateAssociatedAdd(associatedAddObj)
																																	.then(updatedAssociatedAdd => {
																																		transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																																		updateTransaction(transactionObj)
																																			.then(updatedTransaction => {
																																				if (key1 == txs.length-1) {
																																					if (key == accounts.length-1){
																																						callback(null, 'some parameter');
																																					} else {
																																						nextCallback();
																																					}
																																				} else {
																																					transCallback()
																																				}
																																			})
																																	})
																															}
																														})
																												} else {
																													updateTransaction(transactionObj)
																														.then(updatedTransaction => {
																															if (key1 == txs.length-1) {
																																	if (key == accounts.length-1){
																																			callback(null, 'some parameter');
																																	} else {
																																			nextCallback();
																																	}
																															} else {
																																	transCallback()
																															}
																														})
																												}
																											})
																									})
																							} else {
																								if (key1 == txs.length-1) {
																									if (key == accounts.length-1){
																										callback(null, 'some parameter');
																									} else {
																										nextCallback();
																									}
																								} else {
																									transCallback()
																								}
																							}
																						}
																					})
																				})
																			}
																		});                                                                    
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
                async.eachOfSeries(accounts, function(acct, key, nextCallback) {
									async.waterfall([
										function(callback) {
											findUserWalletByWalletId(acct.id)
												.then(userWallet => {
													if (userWallet) {
														userWallet.walletName = acct.name
														userWallet.walletType = acct.type
														userWallet.balance = acct.balance.amount
														userWallet.currency = acct.currency.code
														callback(null, userWallet, acct);
													} else {
														userWallet = UserWallet.build({walletId: acct.id, walletName: acct.name, walletType: acct.type, balance: acct.balance.amount, currency: acct.currency.code})
														userWallet.setUserprovider(userProviderObj, {save: false})
														callback(null, userWallet, acct);
													}
												})
										}
									],
                  function(err, userWallet, acct) {
                    updateUserWallet(userWallet)
											.then(updatedUserWallet => {
												acct.getTransactions({}, function(transactionErr, txs) {
													if (transactionErr) {
														caughtError(res, transactionErr)
													} else {
														async.eachOfSeries(txs, function(trans, key1, transCallback) {
															findTransactionByTrxId(trans.id)
																.then(transactionObj => {
																	var trx_date = new Date(trans.created_at); // The 0 there is the key, which sets the date to the epoch
																	var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
																	if (transactionObj) {
																		if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																			transactionObj.destination = trans.details.title + ' ' + trans.details.subtitle;
																			transactionObj.amount = trans.amount.amount;
																			transactionObj.asset = trans.amount.currency;
																			transactionObj.value = trans.native_amount.amount;
																			transactionObj.transactionDate = moment_date
																			let transType = 2
																			if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to))) {
																				transType = 3
																			}
																			findTransactionTypeById(transType)
																				.then(transactionTypeObj => {
																					transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																					findTrxImportTypeById(1)
																						.then(trxImportTypeObj => {
																							transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																							if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																								findAssociatedAddByAdd(trans.to.address)
																									.then(associatedAddObj => {
																										if (associatedAddObj) {
																											transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																											updateTransaction(transactionObj)
																												.then(updatedTransaction => {
																													if (key1 == txs.length-1) {
																														if (key == accounts.length-1){
																															callback(null, 'some parameter');
																														} else {
																															nextCallback();
																														}
																													} else {
																														transCallback()
																													}
																												})
																										} else {
																											associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																											updateAssociatedAdd(associatedAddObj)
																												.then(updatedAssociatedAdd => {
																													transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																													updateTransaction(transactionObj)
																														.then(updatedTransaction => {
																															if (key1 == txs.length-1) {
																																if (key == accounts.length-1){
																																	callback(null, 'some parameter');
																																} else {
																																	nextCallback();
																																}
																															} else {
																																transCallback()
																															}
																														})
																												})
																										}
																									})
																							} else {
																								updateTransaction(transactionObj)
																									.then(updatedTransaction => {
																										if (key1 == txs.length-1) {
																												if (key == accounts.length-1){
																														callback(null, 'some parameter');
																												} else {
																														nextCallback();
																												}
																										} else {
																												transCallback()
																										}
																									})
																							}
																						})
																				})
																		} else {
																			if (key1 == txs.length-1) {
																				if (key == accounts.length-1){
																					callback(null, 'some parameter');
																				} else {
																					nextCallback();
																				}
																			} else {
																				transCallback()
																			}
																		}
																	} else {
																		if (trans.type == 'exchange_deposit' || trans.type == 'exchange_withdrawal' || trans.type == 'send' || trans.type == 'fiat_deposit' || trans.type == 'fiat_withdrawal' || trans.type == 'buy') {
																			transactionObj = Transaction.build({trxId: trans.id, destination: trans.details.title + ' ' + trans.details.subtitle, transactionDate: moment_date, amount:trans.amount.amount, asset: trans.amount.currency, value: trans.native_amount.amount})
																			transactionObj.setUser(user, {save: false})
																			transactionObj.setUserwallet(updatedUserWallet, {save: false})
																			let transType = 2
																			if (trans.type == 'exchange_withdrawal' || trans.type == 'fiat_withdrawal' || trans.type == 'buy' || (trans.type == 'send' && isNil(trans.to))) {
																				transType = 3
																			}
																			findTransactionTypeById(transType)
																				.then(transactionTypeObj => {
																					transactionObj.setTransactiontype(transactionTypeObj, {save: false})
																					findTrxImportTypeById(1)
																						.then(trxImportTypeObj => {
																							transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
																							if (trans.type == 'send' && !isNil(trans.to) && !isNil(trans.to.address)) {
																								findAssociatedAddByAdd(trans.to.address)
																									.then(associatedAddObj => {
																										if (associatedAddObj) {
																											transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
																											updateTransaction(transactionObj)
																												.then(updatedTransaction => {
																													if (key1 == txs.length-1) {
																														if (key == accounts.length-1){
																															callback(null, 'some parameter');
																														} else {
																															nextCallback();
																														}
																													} else {
																														transCallback()
																													}
																												})
																										} else {
																											associatedAddObj = AssociatedAddress.build({address: trans.to.address, nickName: trans.to.address})
																											updateAssociatedAdd(associatedAddObj)
																												.then(updatedAssociatedAdd => {
																													transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
																													updateTransaction(transactionObj)
																														.then(updatedTransaction => {
																															if (key1 == txs.length-1) {
																																if (key == accounts.length-1){
																																	callback(null, 'some parameter');
																																} else {
																																	nextCallback();
																																}
																															} else {
																																transCallback()
																															}
																														})
																												})
																										}
																									})
																							} else {
																								updateTransaction(transactionObj)
																									.then(updatedTransaction => {
																										if (key1 == txs.length-1) {
																												if (key == accounts.length-1){
																														callback(null, 'some parameter');
																												} else {
																														nextCallback();
																												}
																										} else {
																												transCallback()
																										}
																									})
																							}
																						})
																					})
																		} else {
																			if (key1 == txs.length-1) {
																				if (key == accounts.length-1){
																					callback(null, 'some parameter');
																				} else {
																					nextCallback();
																				}
																			} else {
																				transCallback()
																			}
																		}
																	}
																})
														})
													}
												});                                            
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

router.post('/api/accounts/user-addresses-insert', ensureAuthorization, (req, res) => {
	const { body, user } = req
	if ( !body ) {
		rejectRequest('Missing request body', res)
		return;
	}

	const { coinAddresses } = body
	if ( !coinAddresses ) {
		rejectRequest('Missing required arguments', res)
		return;
	}
	//console.log('coinAddresses : ' + coinAddresses)
	var addressArray = coinAddresses.toString().split(',');
	//console.log('addressArray : ' + addressArray)
	var validAddresses = new Array();
	addressArray.forEach(function(address, index) {
		//console.log('address : ' + address)
		if (WAValidator.validate(address)) {
			validAddresses[index] = address
		}
	})
	//validAddresses[0] = '0x4961aC1d43B6249bc998D611F33d42B54E31712E'
	//console.log('validAddresses : ' + validAddresses)
	if (validAddresses.length > 0) {
		async.eachSeries(validAddresses, function(coinAddress, nextCallback) {
			//console.log('111111111')
			blockexplorer.getAddress(coinAddress)
				.then(address => {
					//console.log('2222222')
					async.waterfall([
						function(callback) {
							//console.log('333333333')
							findUserAddressByAddress(user.id, coinAddress)
								.then(userAddress => {
									if (userAddress) {
										userAddress.balance = address.final_balance
										callback(null, userAddress);
									} else {
										userAddress = UserAddress.build({address: coinAddress, nickName: coinAddress, balance: address.final_balance, currency: 'BTC'})
										userAddress.setUser(user, {save: false})
										callback(null, userAddress);
									}
								})
						},
						function(userAddress, callback) {
							updateUserAddress(userAddress)
								.then(updatedUserAddress => {
									callback(null, updatedUserAddress);
								})
						},
						function(userAddress, callback) {
							let transIndex = 0;
							let transactionArr = address.txs;
							insertTransactions(transactionArr, transIndex, callback, user, userAddress);
						}
					],
					function(err, arg1) {
						nextCallback();
					})
				})
				.catch(error => {
					console.log('error here')
					console.log('error : ' + error)
					caughtError(res, error)
				})
		}, function(err) {
			if( err ) {
				rejectRequest('Failed to process addresses, please try again', res)
				return;
			} else {
				findAllUserAddresses(user.id)
					.then(userAddressesList => {
						res
							.status(200)
							.send({
									userAddressesList
							})
					})
			}
		})
	} else {
		rejectRequest('Invalid Addresses', res)
		return;
	}
})

router.post('/api/accounts/user-addresses-refresh', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { userAddressId } = body
    if ( !userAddressId ) {
      rejectRequest('Missing required arguments', res)
    	return;
		}

		async.waterfall([
			function(callback) {
				findUserAddressById(userAddressId)
					.then(userAddress => {
						blockexplorer.getAddress(userAddress.address)
							.then(address => {
								userAddress.balance = address.final_balance
								callback(null, userAddress, address);
							})
							.catch(error => {
								caughtError(res, error)
							})
					})
			},
			function(userAddress, address, callback) {
				updateUserAddress(userAddress)
					.then(updatedUserAddress => {
						callback(null, updatedUserAddress, address);
					})
			},
			function(userAddress, address, callback) {
				let transIndex = 0;
				let transactionArr = address.txs;
				insertTransactions(transactionArr, transIndex, callback, user, userAddress);
			}
		],
		function(err, arg1) {
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

    /*findUserAddressById(userAddressId)
			.then(userAddress => {
				if (userAddress) {
					userAddress.balance = address.final_balance
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
					res
						.status(400)
						.send({
							message: 'Address not found'
					})
				}
			})
			.catch(error => {
				caughtError(res, error)
			})*/
})

router.post('/api/accounts/user-address-delete', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { userAddressId } = body
    if ( !userAddressId ) {
      rejectRequest('Missing required arguments', res)
    	return;
		}
		
    deleteUserAddressById(userAddressId)
			.then(result => {
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
})

router.post('/api/accounts/user-address-update', ensureAuthorization, (req, res) => {
    const { body, user } = req

    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }
    
    const { userAddressId, userAddressNickName } = body
    if ( !userAddressId || !userAddressNickName ) {
      rejectRequest('Missing required arguments', res)
    	return;
    }
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
})

router.post('/api/accounts/associated-myaddress-update', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { associatedAddId, associatedAddNick } = body
    if ( !associatedAddId || !associatedAddNick ) {
      rejectRequest('Missing required arguments', res)
    	return;
		}
		
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
})

router.post('/api/accounts/associated-walletaddress-update', ensureAuthorization, (req, res) => {
    const { body, user } = req
    if ( !body ) {
    	rejectRequest('Missing request body', res)
      return;
    }

    const { associatedAddId, associatedAddNick } = body
    if ( !associatedAddId || !associatedAddNick ) {
      rejectRequest('Missing required arguments', res)
    	return;
    }
		
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
})

function insertTransactions(transactionArr, index, done, userObj, userAddressObj) {
    if (index == transactionArr.length){
        done(null, 'some params')
    } else {
        let transaction = transactionArr[index]
        //console.log('trxId : ' + transaction.tx_index)
        findTransactionByTrxId(transaction.tx_index)
            .then(transactionObj => {
                //console.log('inside promise************************')
                var utcSeconds = transaction.time;
                var trx_date = new Date(utcSeconds*1000); // The 0 there is the key, which sets the date to the epoch
                var moment_date = moment(trx_date).format("YYYY-MM-DD HH:MM:SS")
                if (transactionObj) {
                    transactionObj.destination = 'some address1'
                    transactionObj.transactionDate = moment_date
                    findTransactionTypeById(1)
                        .then(transactionTypeObj => {
                            transactionObj.setTransactiontype(transactionTypeObj, {save: false})
                            findTrxImportTypeById(2)
                                .then(trxImportTypeObj => {
                                    transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
                                    
                                    let transaction_Out_Arr = transaction.out;
                                    let myAssociateAdd = ''
                                    transaction_Out_Arr.forEach(function(trx_out, j) {
                                        if (trx_out.addr != userAddressObj.address) {
                                            myAssociateAdd = trx_out.addr
                                        }
                                    })
                                    if (myAssociateAdd) {
                                        findAssociatedAddByAdd(myAssociateAdd)
                                            .then(associatedAddObj => {
                                                if (associatedAddObj) {
                                                    transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
                                                    updateTransaction(transactionObj)
                                                        .then(updatedTransaction => {
                                                            insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                                        })
                                                } else {
                                                    associatedAddObj = AssociatedAddress.build({address: myAssociateAdd, nickName: myAssociateAdd})
                                                    updateAssociatedAdd(associatedAddObj)
                                                        .then(updatedAssociatedAdd => {
                                                            transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
                                                            updateTransaction(transactionObj)
                                                                .then(updatedTransaction => {
                                                                    insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                                                })
                                                        })
                                                }
                                            })
                                    } else {
                                        transactionObj.destination = userAddressObj.address
                                        updateTransaction(transactionObj)
                                            .then(updatedTransaction => {
                                                insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                            })
                                    }
                                })
                        })
                } else {
                    transactionObj = Transaction.build({trxId: transaction.tx_index, destination: 'some address', transactionDate: moment_date})
                    transactionObj.setUser(userObj, {save: false})
                    transactionObj.setUseraddress(userAddressObj, {save: false})
                    findTransactionTypeById(1)
                        .then(transactionTypeObj => {
                            transactionObj.setTransactiontype(transactionTypeObj, {save: false})
                            findTrxImportTypeById(2)
                                .then(trxImportTypeObj => {
                                    transactionObj.setTransactionimporttype(trxImportTypeObj, {save: false})
                                    
                                    let transaction_Out_Arr = transaction.out;
                                    let myAssociateAdd = ''
                                    transaction_Out_Arr.forEach(function(trx_out, j) {
                                        if (trx_out.addr != userAddressObj.address) {
                                            myAssociateAdd = trx_out.addr
                                        }
                                    })
                                    if (myAssociateAdd) {
                                        findAssociatedAddByAdd(myAssociateAdd)
                                            .then(associatedAddObj => {
                                                if (associatedAddObj) {
                                                    transactionObj.setAssociatedaddress(associatedAddObj, {save: false})
                                                    updateTransaction(transactionObj)
                                                        .then(updatedTransaction => {
                                                            insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                                        })
                                                } else {
                                                    associatedAddObj = AssociatedAddress.build({address: myAssociateAdd, nickName: myAssociateAdd})
                                                    updateAssociatedAdd(associatedAddObj)
                                                        .then(updatedAssociatedAdd => {
                                                            transactionObj.setAssociatedaddress(updatedAssociatedAdd, {save: false})
                                                            updateTransaction(transactionObj)
                                                                .then(updatedTransaction => {
                                                                    insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                                                })
                                                        })
                                                }
                                            })
                                    } else {
                                        transactionObj.destination = userAddressObj.address
                                        updateTransaction(transactionObj)
                                            .then(updatedTransaction => {
                                                insertTransactions(transactionArr, ++index, done, userObj, userAddressObj)
                                            })
                                    }
                                })
                        })
                }
                
            })
    }
}

export default router