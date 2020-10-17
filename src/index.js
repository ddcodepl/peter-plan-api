/**
 * Dependencies
 */
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'

/**
 * Configs
 */
import dbConfig from './configs/db'

/**
 * Routes
 */

dotenv.config()
dbConfig()

const app = express()
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

app.use(bodyParser.json())

// Headers config
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

// Startup server
app.set('port', process.env.APP_PORT || 9999)
app.listen(app.get('port'), function() {
    // eslint-disable-next-line no-console
    console.log(`Server is up and running on port: ${app.get('port')}`)
})

/**
 * Add routes to the system
 *
 * Example: app.use('/news', news())
 */
//

/**
 * Static directories
 *
 * app.use('/images', express.static('./images'))
 */
