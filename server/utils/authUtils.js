// libs
import passport from 'passport'

// src
 import { findUserByUsername } from '../managers/userManager'

export const setupPassport = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser' )
    console.log(user)
    done(null, user.user_name)
  })

  passport.deserializeUser((user_name, done) => {
    console.log('deserializeUser user name'+user_name )
      findUserByUsername(user_name)
    .then(user => { 
      done(null, user)
    }) 
  })
}

// use where you want to make sure that
// a user is not and should not be already logged-in
export const ensureAnonymity = (req, res, next) => {
  const {user} = req

  if (user) {
    res
      .status(401)
      .send({message: `This url cannot be called since a user is already logged in: ${user.email}`})
    return
  }

  next()
}

const handleAuthError = (req, res) => {
  const { url, user, path } = req

  if (url.indexOf('/api') > -1) {
    res
      .status(401)
      .send({
        message: 'Access denied'
      })
  } else {
    if (!user) {
      res.redirect(`/login?redirectUrl=${path}`)
    } else {
      res.render('error', {message: 'Access Denied, you are not authorized to view this page.'})
    }
  }
}

export const authorizePath = (req, res, next) => {
  const { user } = req

  if (!user) {
    handleAuthError(req, res)
  }

  next()
}

export const ensureAuthorization = authorizePath

export const rejectRequest = (message, res) => res
  .status(400)
  .send({
    message
  })
