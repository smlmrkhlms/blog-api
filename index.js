const bodyParser = require('body-parser')
const connect = require('./utilities/connect')
const express = require('express')
const helmet = require('helmet')
const listen = require('./utilities/listen')
const log = require('./utilities/log')
const morgan = require('morgan')
const routes = require('./api/routes')
const use = require('./utilities/use')
const { database } = require('./config')
const { PORT: port = 8080 } = process.env

Promise.resolve(express())
  .then(use(bodyParser.urlencoded({ extended: false })))
  .then(use(bodyParser.json()))
  .then(use(helmet()))
  .then(routes('/api/v1'))
  .then(listen(port))
  .then(log(`Listening on http://localhost:${ port }.`))
  .then(connect(database))
  .then(log('Connected to database.'))
  .catch(console.error)
