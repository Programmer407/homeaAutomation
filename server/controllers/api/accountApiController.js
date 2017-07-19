// libs
import express from 'express'

// src
import { ensureAnonymity, caughtError } from '../../utils'
//import { findAllByUserID } from '../../managers/userProviderManager'

const router = express.Router()

/*router.get('/api/accounts/my-account-listn', (req, res) => {
    const {user} = req
    console.log('logged in user is : ' + JSON.stringify(user))
    if (user) {
        findAllByUserID(user.id)
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
})*/

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

export default router