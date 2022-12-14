require('dotenv/config')
const path = require('path')
const apps = require('express')()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const routes = require('./app/routes')

apps.use(cors())
    .use(bodyParser.json())
    .use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }))
    .use('/', require('express').static(path.join(__dirname, 'public')))
    .use('/api', routes)
    .listen(process.env.APP_PORT || 3000)