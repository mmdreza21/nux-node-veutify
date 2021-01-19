require('dotenv').config()

const express = require('express')

const { logger } = require('./utils/logger')

process.on('unhandledRejection', (ex) => {
    throw ex
})
const app = express()

require('express-async-errors');
require('./middlewares/error')
require('./utils/router')(app)
require('./utils/db')()
require('./utils/validate')()

const port = 8585
app.listen(port, () => logger.info(`Example app listening on port ${port}!`))