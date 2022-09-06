module.exports = (req, res, next) => {
    const { keysec } = req.headers
    if (keysec !== "abcde") {
        return res.status(403).json({
            status: false,
            message: 'invalid secret key'
        })
    } else {
        return next()
    }
}