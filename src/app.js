/* eslint-disable no-undef */
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

require('./services/passport')

const express = require('express')
const cors = require('cors')
const router = express.Router()

const app = express()
app.use(cors())
app.use(express.json())

require('./routes/index')(app, router)

module.exports = app