const { Post } = require('../models')
const { response } = require('../helpers/response')
const { single } = require('../helpers/upload')

module.exports = {
    getPosts: async (req, res) => {
        try {
            const { images } = req.files
            const { description } = req.body
            const upload = single(images)
            if (!upload.status) throw upload.message

            const store = await Post.create({
                user_id: req.user.id,
                content: upload.path,
                description: description
            })
            return response(res, store)
        } catch (error) {
            return response(res, error, +500)
        }
    }
}