const { User } = require('../models')
const { response } = require('../helpers/response')
const { make, verify } = require('../helpers/hash')
const jwt = require('jsonwebtoken')

module.exports = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const hashPassword = await make(password)
            const store = await User.create({
                name: name,
                email: email,
                password: hashPassword
            })
            return response(res, store)
        } catch (error) {
            return response(res, error.message, +500)
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email: email }, include: 'posts' })
            if (user) {
                const checkPassword = await verify(password, user.password)
                if (checkPassword) {
                    const accessToken = jwt.sign({ id: user.id }, process.env.APP_TOKEN, { expiresIn: '1d' })
                    return response(res, {
                        name: user.name,
                        email: user.email,
                        posts: user.posts,
                        accessToken: accessToken
                    })
                }
                throw "email atau password salah"
            }
            throw "email atau password salah"
        } catch (error) {
            return response(res, error.message ?? error, +500)
        }
    }
}