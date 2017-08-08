// libs
import express from 'express'
import crypto from 'crypto';

// src
import { encrypt, decrypt } from '../../utils/encryptionUtils'
import { ensureAnonymity, rejectRequest, caughtError } from '../../utils'
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
    rejectRequest('Missing request body', res)
    return;
  }

  const { email, password } = body
  if ( !email || !password ) {
    rejectRequest('Missing required arguments', res)
    return;
  }
  
  findUserByEmail(email)
    .then(user => {
      if (user) {
        let decryptedPassword = decrypt(user.password)
        if (password == decryptedPassword) {
          isActiveUser(user.id)
            .then(isActive => {
              if (isActive) {
                return req.login(user, err => {
                  if ( err ) {
                    caughtError(res, err)
                  } else {
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
      caughtError(res, error)
    })
})

router.get('/api/logout', (req, res) => {
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
    rejectRequest('Missing request body', res)
    return;
  }

  const { firstName, lastName, email, password } = body
  if ( !firstName || !lastName || !email || !password ) {
    rejectRequest('Missing required arguments', res)
    return;
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
        let encryptedPassword = encrypt(password)
        
        // now instantiate an object
        const userObj = User.build({firstName: firstName, lastName: lastName, email: email, password: encryptedPassword})
        
        findRoleById(2)
          .then(role => {
            userObj.setRole(role, {save: false})
            findUserAccountTypeById(1)
              .then(userAccountType => {
                userObj.setUseraccounttype(userAccountType, {save: false})
                findTimeZoneById(1)
                  .then(timeZone => {
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
                                res
                                  .status(200)
                                  .send({
                                    message: 'Sign up Successfully! Please follow a link in your email to activate your account'
                                  })
                              })
                              .catch(error => {
                                caughtError(res, error)
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
                          caughtError(res, error)
                        })
                    })
                  })
              })
          })
      } 
    })
    .catch(error => {
      caughtError(res, error)
    })
})

router.post('/api/users/forgot-password', ensureAnonymity, (req, res) => {
  const { body } = req
  if ( !body ) {
    rejectRequest('Missing request body', res)
    return;
  }

  const { email } = body
  if ( !email ) {
    rejectRequest('Missing required arguments', res)
    return;
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
                  res
                  .status(200)
                  .send({
                    message: 'Reset password email has been sent to the email address'
                  })
                })
                .catch(error => {
                  caughtError(res, error)
                })
            })
            .catch(error => {
              caughtError(res, error)
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
    caughtError(res, error)
  })
})

router.post('/api/users/search-user-token', (req, res) => {
  const { body } = req
  if ( !body ) {
    rejectRequest('Missing request body', res)
    return;
  }

  const { tokenString } = body
  if ( !tokenString ) {
    rejectRequest('Missing required arguments', res)
    return;
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
      caughtError(res, error)
    }) 
})

router.post('/api/users/reset-password', (req, res) => {
  const { body } = req
  if ( !body ) {
    rejectRequest('Missing request body', res)
    return;
  }

  const { token, password, confirmPassword } = body
  if ( !token || !password || !confirmPassword ) {
    rejectRequest('Missing required arguments', res)
    return;
  } else if (password !== confirmPassword) {
    rejectRequest('Password and Confirm Password does not match', res)
    return;
  }

  findUserByToken(token)
    .then(user => {
      if (user) {
        let encryptedPassword = encrypt(password)
        user.password = encryptedPassword;
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
              caughtError(res, error)
            })
      } else {
        res
          .status(400)
          .send({
            message: 'User does not exist'
          })
      } 
    })
    .catch(error => {
      caughtError(res, error)
    })
})

router.post('/api/users/verify-account', (req, res) => {
  const { body } = req
  if ( !body ) {
    rejectRequest('Missing request body', res)
    return;
  }

  const { token } = body
  if ( !token ) {
    rejectRequest('Missing required arguments', res)
    return;
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
              caughtError(res, error)
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
      caughtError(res, error)
    })
})

router.post('/api/users/resend-activation', (req, res) => {
  const { body } = req
  if ( !body ) {
    rejectRequest('Missing request body', res)
    return;
  }

  const { userId } = body
  if ( !userId ) {
    rejectRequest('Missing required arguments', res)
    return;
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
                  res
                    .status(200)
                    .send({
                      message: 'Activation email sent Successfully! Please follow a link in your email to activate your account'
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
      caughtError(res, error)
    })
})

export default router
