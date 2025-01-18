const express = require('express')
const cors = require('cors')

const routing = require('./routing.config')

const app = express()
app.use(cors())
app.use(express.json())

app.use(routing)

module.exports = app