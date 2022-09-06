const { User } = require('../models')
const { response } = require('../helpers/response')
const { make, verify } = require('../helpers/hash')

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
            const user = await User.findOne({ where: { email: email } })
            if (user) {
                const checkPassword = await verify(password, user.password)
                if (checkPassword) {
                    return response(res, {
                        name: user.name,
                        email: user.email
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