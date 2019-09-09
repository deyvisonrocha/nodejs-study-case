const express = require('express')
const logger = require('morgan')
const moviesRouter = require('./routes/movies')
const usersRouter = require('./routes/users')
const bodyParser = require('body-parser')
const mongoose = require('./config/database')
const jwt = require('jsonwebtoken')
const app = express()

app.set('secretKey', 'nodeRestApi')

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'))

app.get('/', function (req, res) {
  res.json({
    "tutorial": "Build REST API with node.js"
  })
})

// public route
app.use('/users', usersRouter)

// private route
app.use('/movies', validateUser, moviesRouter)

// favicon fix
app.use('/favicon.ico', function (req, res) {
  res.sendStatus(204)
})

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: err.message,
        data: null
      })
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
}

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not found')
  err.status = 404
  next(err)
})

// handle errors
app.use(function (err, req, res, next) {
  if (err.status === 404) {
    res.status(404).json({
      message: 'Not found'
    })
  } else {
    res.status(500).json({
      message: 'Something looks wrong :('
    })
  }
})

// Listen
app.listen(3000, function () {
  console.log('Node server listening on port 3000')
})
