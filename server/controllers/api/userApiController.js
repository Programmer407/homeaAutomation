// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import { insertUser, findUserByEmail, findUserByEmailAndPassword } from '../../managers/userManager'
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

  const { email, password, rememberMe } = body

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
            if (!rememberMe || rememberMe == null) {
              req.session.cookie.expires = false;
            }
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
  res.send({
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
                                    req.session.cookie.expires = false;
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
      console.log('user : ' + JSON.stringify(user))
      if (user) {
        res
          .status(200)
          .send({
            message: 'Email has been sent to change the password'
          })
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
      //caughtError(res, error)
      res
      .status(500)
      .send({
        message: 'Something went wrong'
      })
    })
})

export default router
