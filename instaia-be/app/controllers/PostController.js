const { Post } = require('../models')
const { response } = require('../helpers/response')
const { single } = require('../helpers/upload')

module.exports = {
    store: async (req, res) => {
        try {
            const { images } = req.files
            const { description } = req.body
            const upload = single(images, null)
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
    },
    update: async (req, res) => {
        try {
            const { postid } = req.params
            const { description } = req.body
            const { images } = req.files
            const post = await Post.findOne({ where: { id: postid } })
            if (!post) throw 'post not found'
            if (post.user_id != req.user.id) throw 'post not for you'

            if (images) {
                const upload = single(images, post.content)
                if (!upload.status) throw upload.message
                post.content = upload.path
            }
            post.description = description
            await post.save()
            return response(res, post.content.split('/')[post.content.split('/').length - 1])
        } catch (error) {
            return response(res, error, +500)
        }
    }
}