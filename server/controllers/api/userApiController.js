// libs
import express from 'express'
import crypto from 'crypto';

// src
import { ensureAnonymity, caughtError } from '../../utils'
import { findUserByRegistrationToken, isActiveUser, findUserByToken, insertUser, updateUser, findUserByID, findUserByEmail, findUserByEmailAndPassword } from '../../managers/userManager'
import { findRoleById } from '../../managers/roleManager'
import { findUserAccountTypeById } from '../../managers/userAccountTypeManager'
import { findTimeZoneById } from '../../managers/timeZoneManager'
import User from './../../models/User'
import emailUtils from './../../utils/emailUtils'
var Client = require('coinbase').Client;

const router = express.Router()

// requires email and password
router.post('/api/login', ensureAnonymity, (req, res) => {
  const { body } = req

  if ( !body ) {
    res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  //const { email, password, rememberMe } = body
  const { email, password } = body

  if ( !email || !password ) {
    res
      .status(400)
      .send({
        message: 'Missing required arguments'
      })
  }
  
  findUserByEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        isActiveUser(user.id)
          .then(isActive => {
            if (isActive) {
              /*var client = new Client({'apiKey': 'lKwiLoagJZilnknI', 'apiSecret': 'aqTKBqF2HBkytYYJJfPeZ08Jh4bCE9Xh'});

              client.getAccounts({}, function(err, accounts) {
                if (err) {
                  console.log('err is : ' + err)
                } else {
                accounts.forEach(function(account) {
                  console.log(account.name);
                });
                }
              });
*/
              return req.login(user, err => {
                if ( err ) {
                  caughtError(res, err)
                } else {
                  /*if (!rememberMe || rememberMe == null) {
                    req.session.cookie.expires = false;
                  }*/
                  
                  //var hour = 120000
                  //req.session.cookie.expires = new Date(Date.now() + hour)
                  //req.session.cookie.maxAge = hour
                  res.send({ user })
                }
              })
            } else {
              res
                .status(404)
                .send({
                  message: 'Your account is currently inactive. Please click <a href="/resend/activation/'+user.id+'">here</a> to resend the email containing activation link'
                })
            }
          })
      } else {
        //caughtError(res, error)
        res
        .status(404)
        .send({
          message: 'Invalid username or password'
        })
      }
    })
    .catch(error => {
      //caughtError(res, error)
      res
      .status(500)
      .send({
        message: 'Something went wrong, Please try again'
      })
    })
})

router.get('/api/logout', (req, res) => {
  console.log('logout called.')
  req.logout()
  res
    .status(200)
    .send({
    message: 'User logged out successfully!'
  })
})

router.post('/api/users/create', ensureAnonymity, (req, res) => {
  const { body } = req

  if ( !body ) {
    return res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { firstName, lastName, email, password } = body

  if ( !firstName || !lastName || !email || !password ) {
    return res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }
  findUserByEmail(email)
    .then(user => {
      if (user) {
        return res
          .status(404)
          .send({
            message: 'Username already exist'
          })
      } else {
        // now instantiate an object
        const userObj = User.build({firstName: firstName, lastName: lastName, email: email, password: password})
        
        findRoleById(2)
          .then(role => {
            if (role) {
              userObj.setRole(role, {save: false})
              findUserAccountTypeById(1)
                .then(userAccountType => {
                  if (userAccountType) {
                    userObj.setUseraccounttype(userAccountType, {save: false})
                    findTimeZoneById(1)
                      .then(timeZone => {
                        if (timeZone) {
                          userObj.setTimezone(timeZone, {save: false})
                          userObj.status = 0
                          
                          crypto.randomBytes(20, function(err, buf) {
                            var token = buf.toString('hex');
                            userObj.registerToken = token;
                            userObj.registerExpires = Date.now() + 86400000; // 24 hours; 1 hour = 3600000
                            
                            insertUser(userObj)
                              .then(user => {
                                if (user) {
                                  var activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + user.registerToken
                                  const data = {firstName: user.firstName, activationUrl: activationUrl};
                                  
                                  var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
                                  var toEmailAddress = 'majid.hussain@emumba.com'
                                  if (allowedEmailList.indexOf(email) > -1) {
                                    toEmailAddress = email
                                  }

                                  emailUtils.sendAccountActivationEmail(toEmailAddress, data)
                                    .then(result => {
                                      console.log('Email Sent')
                                      res
                                      .status(200)
                                      .send({
                                        message: 'Sign up Successfully! Please follow a link in your email to activate your account'
                                      })
                                    })
                                    .catch(error => {
                                      console.log('Email not Sent, Error here. ' + error)
                                      res
                                        .status(400)
                                        .send({
                                        message: 'Something went wrong, Please try again'
                                        })
                                    })
                                } else {
                                  //caughtError(res, error)
                                  res
                                  .status(400)
                                  .send({
                                    message: 'Something went wrong, Please try again'
                                  })
                                }
                              })
                              .catch(error => {
                                //caughtError(res, error)
                                return res
                                .status(500)
                                .send({
                                  message: 'Something went wrong, Please try again'
                                })
                              })
                          })
                        } else {
                          console.log('timeZone does not exist')
                        }
                      })
                  } else {
                    console.log('userAccountType does not exist')
                  }
                })
            } else {
              console.log('role does not exist')
            }
          })
      } 
    })
    .catch(error => {
      //caughtError(res, error)
      return res
      .status(500)
      .send({
        message: 'Something went wrong, Please try again'
      })
    })
})

router.post('/api/users/forgot-password', ensureAnonymity, (req, res) => {
  const { body } = req

  if ( !body ) {
    res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { email } = body

  if ( !email ) {
    res
      .status(400)
      .send({
        message: 'Missing required arguments'
      })
  }

  findUserByEmail(email)
    .then(user => {
      if (user) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 86400000; // 24 hours; 1 hour = 3600000
          updateUser(user)
            .then(user => {
              var resetUrl = req.protocol + '://' + req.get('host') + '/resetPassword/' + user.resetPasswordToken
              const data = {firstName: user.firstName, resetLink: resetUrl};

              var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
              var toEmailAddress = 'majid.hussain@emumba.com'
              if (allowedEmailList.indexOf(email) > -1) {
                toEmailAddress = email
              }

              emailUtils.sendResendPasswordEmail(toEmailAddress, data)
                .then(result => {
                  console.log('Email Sent')
                  res
                  .status(200)
                  .send({
                    message: 'Reset password email has been sent to the email address'
                  })
                })
                .catch(error => {
                  console.log('Email not Sent, Error here. ' + error)
                  res
                    .status(400)
                    .send({
                    message: 'Something went wrong, Please try again'
                    })
                })
            })
            .catch(error => {
              res
              .status(400)
              .send({
                message: 'Something went wrong, Please try again'
              })
            })
        });
      } else {
        //caughtError(res, error)
        res
        .status(404)
        .send({
          message: 'Invalid username'
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

router.post('/api/users/search-user-token', (req, res) => {
  const { body } = req

  if ( !body ) {
    return res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { tokenString } = body

  if ( !tokenString ) {
    return res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }
  findUserByToken(tokenString)
    .then(user => {
      if (user) {
        res
          .status(200)
          .send({
            message: 'true'
          })
      } else {
        res
          .status(400)
          .send({
            message: 'false'
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

router.post('/api/users/reset-password', (req, res) => {
  const { body } = req

  if ( !body ) {
    return res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { token, password, confirmPassword } = body

  if ( !token || !password || !confirmPassword ) {
    return res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  } else if (password !== confirmPassword) {
    return res
      .status(400)
      .send({
        message: 'Password and Confirm Password does not match.'
      })
  }
  findUserByToken(token)
    .then(user => {
      if (user) {
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        updateUser(user)
          .then(user => {
            res
              .status(200)
              .send({
                message: 'Password has been changed, please <a href="/login">login</a>'
              })
            })
            .catch(error => {
              res
              .status(400)
              .send({
                message: 'Something went wrong, Please try again'
              })
            })
      } else {
        // now instantiate an object
        res
          .status(400)
          .send({
            message: 'User does not exist'
          })
      } 
    })
    .catch(error => {
      //caughtError(res, error)
      return res
      .status(500)
      .send({
        message: 'Something went wrong, Please try again'
      })
    })
})

router.post('/api/users/verify-account', (req, res) => {
  const { body } = req

  if ( !body ) {
    return res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { token } = body

  if ( !token ) {
    return res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }
  findUserByRegistrationToken(token)
    .then(user => {
      if (user) {
        user.status = 1;
        user.registerToken = null;
        user.registerExpires = null;
        updateUser(user)
          .then(user => {
            res
              .status(200)
              .send({
                //message: 'Your account has been activated, please <a href="/login">login</a>'
                message: 'Your account has been activated, please login'
              })
            })
            .catch(error => {
              res
              .status(400)
              .send({
                message: 'Something went wrong, Please try again'
              })
            })
      } else {
        // now instantiate an object
        res
          .status(400)
          .send({
            message: 'User does not exist'
          })
      } 
    })
    .catch(error => {
      //caughtError(res, error)
      return res
      .status(500)
      .send({
        message: 'Something went wrong, Please try again'
      })
    })
})

router.post('/api/users/resend-activation', (req, res) => {
  const { body } = req

  if ( !body ) {
    return res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { userId } = body

  if ( !userId ) {
    return res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }
  findUserByID(userId)
    .then(user => {
      if (user) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          user.registerToken = token;
          user.registerExpires = Date.now() + 86400000; // 24 hours; 1 hour = 3600000
          user.status = 0;
          updateUser(user)
            .then(user => {
              var activationUrl = req.protocol + '://' + req.get('host') + '/activateAccount/' + user.registerToken
              const data = {firstName: user.firstName, activationUrl: activationUrl};

              var allowedEmailList = ['majid.hussain@emumba.com', 'muhammad.kasim@emumba.com', 'zishan.iqbal@emumba.com', 'jawad.butt@emumba.com', 'arij.m.nazir@gmail.com']
              var toEmailAddress = 'majid.hussain@emumba.com'
              if (allowedEmailList.indexOf(user.email) > -1) {
                toEmailAddress = user.email
              }

              emailUtils.resendAccountActivationEmail(toEmailAddress, data)
                .then(result => {
                  console.log('Email Sent')
                  res
                    .status(200)
                    .send({
                      message: 'Activation email sent Successfully! Please follow a link in your email to activate your account'
                    })
                })
                .catch(error => {
                  console.log('Email not Sent, Error here. ' + error)
                  res
                    .status(400)
                    .send({
                    message: 'Something went wrong, Please try again'
                    })
                })
              })
              .catch(error => {
                res
                .status(400)
                .send({
                message: 'Something went wrong, Please try again'
                })
              })
         })
      } else {
        // now instantiate an object
        res
          .status(400)
          .send({
            message: 'User does not exist'
          })
      } 
    })
    .catch(error => {
      //caughtError(res, error)
      return res
      .status(400)
      .send({
        message: 'Something went wrong, Please try again'
      })
    })
})

export default router
