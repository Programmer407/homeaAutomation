/* @flow */

// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import { findUserByEmailAndPassword, findUserByEmailAndPassword1 } from '../../managers'


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

  const { email, password } = body

  if ( !email || !password ) {
    res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }

  findUserByEmailAndPassword(email, password)
    .then(user => {
      //console.log('user : ' + JSON.stringify(user))

      return req.login(user, err => {
        if ( err ) {
          caughtError(res, err)
        } else {
          res.send({ user })
        }
      })
    })
    .catch(error => {
      //console.log('error')
      //caughtError(res, error)
      res
      .status(400)
      .send({
        message: 'Invalid username or password'
      })
    })

  /*const user = findUserByEmailAndPassword(email, password)
  console.log('user : ' + user)
  if ( !user ) {
    res
      .status(400)
      .send({
        message: 'Invalid username or password'
      })
  }

  return req.login(user, err => {
    if ( err ) {
      caughtError(res, err)
    } else {
      res.send({ user })
    }
  })*/
})

router.get('/api/logout', (req, res) => {
  req.logout()
  res.send({
    message: 'User logged out successfully!'
  })
})

export default router
