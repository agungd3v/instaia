const jwt = require('jsonwebtoken')

const requestOrigin = (req, res, next) => {
    const { origin } = req.headers
    if (origin !== process.env.APP_REQUEST) return res.status(401).json({
        status: false,
        message: 'invalid cross origin'
    })
    return next()
}

const requestAuth = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    if (!token) return res.status(401).json({
        status: false,
        message: 'invalid authorization'
    })
    jwt.verify(token, process.env.APP_TOKEN, (err, data) => {
        if (err) return res.status(401).json({
            status: false,
            message: 'invalid authorization'
        })
        req.user = data
        next()
    })
}

module.exports = { requestOrigin, requestAuth }