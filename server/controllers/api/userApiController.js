// libs
import express from 'express'
import crypto from 'crypto';

// src
import { ensureAnonymity, caughtError } from '../../utils'
import { findUserByToken, insertUser, updateUser, findUserByID, findUserByEmail, findUserByEmailAndPassword } from '../../managers/userManager'
import { findRoleById } from '../../managers/roleManager'
import { findUserAccountTypeById } from '../../managers/userAccountTypeManager'
import { findTimeZoneById } from '../../managers/timeZoneManager'
import User from './../../models/User'

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
      console.log('user : ' + JSON.stringify(user))
      if (user) {
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
        console.log('User not found')
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
        message: 'Something went wrong'
      })
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
        console.log('user already exist')
        return res
          .status(404)
          .send({
            message: 'Username already exist'
          })
      } else {
        console.log('user does not exist')
        // now instantiate an object
        const userObj = User.build({firstName: firstName, lastName: lastName, email: email, password: password})
        
        findRoleById(2)
          .then(role => {
            if (role) {
              console.log('role exist ' + JSON.stringify(role))
              userObj.setRole(role, {save: false})
              findUserAccountTypeById(1)
                .then(userAccountType => {
                  if (userAccountType) {
                    console.log('userAccountType exist ' + JSON.stringify(userAccountType))
                    console.log('userObj exist ' + JSON.stringify(userObj))
                    userObj.setUseraccounttype(userAccountType, {save: false})
                    findTimeZoneById(1)
                      .then(timeZone => {
                        if (timeZone) {
                          console.log('timeZone exist ' + JSON.stringify(timeZone))
                          userObj.setTimezone(timeZone, {save: false})
                          insertUser(userObj)
                            .then(user => {
                              console.log('user inserted')
                              if (user) {

                                return req.login(user, err => {
                                  console.log('user1 : ' + JSON.stringify(user))

                                  if ( err ) {
                                    console.log('err is : ' + err)
                                    caughtError(res, err)
                                  } else {
                                    console.log('setting cookies.')
                                    //req.session.cookie.expires = 1800000;
                                    res.send({ user })
                                  }
                                })
                              } else {
                                console.log('User not registered')
                                //caughtError(res, error)
                                res
                                .status(400)
                                .send({
                                  message: 'Something went wrong'
                                })
                              }
                            })
                            .catch(error => {
                              console.log('error')
                              //caughtError(res, error)
                              return res
                              .status(500)
                              .send({
                                message: 'Something went wrong'
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
      console.log('error')
      //caughtError(res, error)
      return res
      .status(500)
      .send({
        message: 'Something went wrong'
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
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          updateUser(user)
            .then(user => {
              console.log('Successfull........................')
              res
              .status(200)
              .send({
                message: 'Reset password email has been sent to the email address'
              })
            })
            .catch(error => {
              console.log('Error in updating user with the token')
              res
              .status(400)
              .send({
                message: 'Something went wrong'
              })
            })
        });
      } else {
        console.log('User not found')
        //caughtError(res, error)
        res
        .status(404)
        .send({
          message: 'Invalid username'
        })
      }
  })
  .catch(error => {
    console.log('Error in find user from DB')
    res
      .status(400)
      .send({
        message: 'Something went wrong'
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
  console.log('tokenString : ' + tokenString)
  findUserByToken(tokenString)
    .then(user => {
      if (user) {
        console.log('user exist')
        res
          .status(200)
          .send({
            message: 'true'
          })
      } else {
        console.log('user not exist')
        res
          .status(400)
          .send({
            message: 'false'
          })
      }
    })
    .catch(error => {
      console.log('Error in updating user with the token')
      res
        .status(200)
        .send({
          message: 'Something went wrong'
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
        console.log('user exist')
        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        updateUser(user)
          .then(user => {
            console.log('Successfull........................')
            res
              .status(200)
              .send({
                message: 'Password has been changed, please login.'
              })
            })
            .catch(error => {
              console.log('Error in updating user with the token')
              res
              .status(200)
              .send({
                message: 'Something went wrong'
              })
            })
      } else {
        console.log('user does not exist')
        // now instantiate an object
        res
          .status(400)
          .send({
            message: 'User does not exist'
          })
      } 
    })
    .catch(error => {
      console.log('error')
      //caughtError(res, error)
      return res
      .status(500)
      .send({
        message: 'Something went wrong'
      })
    })
})

export default router
