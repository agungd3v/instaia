const { User } = require('../models')
const { response } = require('../helpers/response')
const { make, verify } = require('../helpers/hash')
const { uploadAvatar } = require('../helpers/upload')
const jwt = require('jsonwebtoken')

module.exports = {
    signup: async (req, res) => {
        try {
            const { name, username, email, phone, password } = req.body
            const hashPassword = await make(password)
            const store = await User.create({
                name: name,
                email: email,
                username: username,
                phone: phone,
                password: hashPassword
            })
            return response(res, {
                name: store.name,
                email: store.email,
                username: store.username,
                phone: store.phone,
                photo: store.photo
            })
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
                    const accessToken = jwt.sign({ id: user.id }, process.env.APP_TOKEN, { expiresIn: '1d' })
                    return response(res, {
                        user: {
                            name: user.name,
                            email: user.email,
                            username: user.username,
                            phone: user.phone,
                            photo: user.photo
                        },
                        token: accessToken
                    })
                }
                throw "email atau password salah"
            }
            throw "email atau password salah"
        } catch (error) {
            return response(res, error.message ?? error, +500)
        }
    },
    changePhoto: async (req, res) => {
        try {
            const { image } = req.files
            const user = await User.findOne({ where: { id: req.user.id } })
            if (!user) throw 'Error'

            const upload = await uploadAvatar(image, user.photo ?? null)
            if (!upload.status) throw upload.message

            user.photo = upload.path
            await user.save()
            return response(res, { name: user.name, email: user.email, username: user.username, phone: user.phone, photo: user.photo })
        } catch (error) {
            return response(res, error, +500)
        }
    }
}