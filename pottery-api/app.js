const express = require('express')
const cors = require('cors')

const { logger } = require('./middleware/logger')
const { ceramicsRouter } = require('./routers/ceramics')

const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.use('/ceramics', ceramicsRouter)

module.exports = {
    app
}