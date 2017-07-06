/* @flow */

// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
import { findUserByEmail, findUserByEmailAndPassword, findUserByEmailAndPassword1 } from '../../managers'


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

// requires email and password
router.post('/api/users/create', ensureAnonymity, (req, res) => {
  const { body } = req

  if ( !body ) {
    res
      .status(400)
      .send({
        message: 'Missing request body'
      })
  }

  const { firstname, lastname, email, password } = body

  if ( !firstname || !lastname || !email || !password ) {
    res
      .status(400)
      .send({
        message: 'Missing requied arguments'
      })
  }
  findUserByEmail(email)
    .then(user => {
      if (user) {
        console.log('user already exist')
        res
          .status(400)
          .send({
            message: 'Username already exist'
          })
      }
    })
    .catch(error => {
      //console.log('error')
      //caughtError(res, error)
      res
      .status(400)
      .send({
        message: 'Username not exist'
      })
    })

  /*registerUser(firstname, lastname, email, password)
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
    */

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

export default router
