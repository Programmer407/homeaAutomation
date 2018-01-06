// libs
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
import helmet from 'helmet'
import compression from 'compression'
import { Server } from 'http'
import { renderFile } from 'ejs'
import cors from 'cors'
import http from 'http'
var  expressJwt = require('express-jwt');
var socket = require('socket.io');
var secretToken = require('./../config/secretToken');

var io = socket();


var user = require('./controllers/userApiController');
var dashboard = require('./controllers/dashboardApiController')(io);
var now = require('./controllers/nowApiController')(io);
var history = require('./controllers/historyApiController')(io);
var adminApiController = require('./controllers/adminApiController')(io);
var microservice = require('./controllers/microserviceApiController')(io);

var models =require('./models');

// src
import devUtils from './utils/devUtils'
import logUtils from './utils/logUtils'
import {
  build404ErrorHandler, build500ErrorHandler,
  setupPassport, setupSessionStore,
  getPort, isProduction
} from './utils'

const port = getPort()
const app = express();
app.io= io;
const httpServer = Server(app)
 setupSessionStore(app)

// gzip filter
app.use(compression())
app.disable('etag')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.engine('ejs', renderFile)
app.set('view engine', 'ejs')
app.set('views', path.resolve('./server/templates/web'))
app.use(express.static(path.resolve('./client/dist')))
app.use(express.static(path.resolve('./server/public')))
// app.use('/images', express.static(__dirname + "/images"))
// If you declare your session and passport configs above static directory configs then all requests 
// for static content will also get a session, which is not good.
app.use(cookieParser())
// security package
app.use(helmet())
// app.use(expressJwt({secret:secretToken.secret}).unless({path:['','/','/login','/login/test']}));
// see setting details here: https://github.com/expressjs/session
// app.use(expressSession(, store: new MySQLStore(options)}))
app.use(passport.initialize())
app.use(passport.session())
setupPassport()

app.use(cors())

if ( isProduction() ) {
  // handle logging
  logUtils.setupWinstonProductionLogs()
  app.use(logUtils.setupUrlLogs)
} else {
  devUtils.setupWebpack(app)
}

if ( process.env.UNIVERSAL_RENDERING === 'false' ) {
  devUtils.setupHMR()
}

// Include server routes as a middleware

app.use('/api/user', user);
app.use('/api/dashboard',dashboard);
app.use('/api/now',now);
app.use('/microservice',microservice);
app.use('/api/history',history);
app.use('/api/admin',adminApiController);


[
    'generealApiController',
    'defaultController',
].forEach(name => app.use(require(`./controllers/${name}`)))

app.use(build404ErrorHandler())
app.use(build500ErrorHandler())

models.sequelize.sync({logging:console.log}).then(function(){
  console.log('sequelized connected');
    var server = http.createServer(app);
    io.attach(server);
    server.listen(port, err => {
        if (err) {
            console.error(`Server startup failed: `, err)
        }

        console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    })

}).catch(function(error){
  console.log('error in connected to microsoft server '+error);
})





