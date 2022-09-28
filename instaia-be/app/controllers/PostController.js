const { Post } = require('../models')
const { response } = require('../helpers/response')
const { remove, uploadPublicPath } = require('../helpers/upload')

module.exports = {
    index: async (req, res) => {
        try {
            const posts = await Post.findAll({
                where: {
                    user_id: req.user.id
                },
                include: [{
                    all: true,
                    attributes: ['name', 'username', 'photo']
                }]
            })
            return response(res, posts)
        } catch (error) {
            return response(res, error, +500)
        }
    },
    store: async (req, res) => {
        try {
            const { images } = req.files
            const { description } = req.body
            const upload = await uploadPublicPath(images, 500, 500, 'posts', null)
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
                const upload = await uploadPublicPath(images, 500, 500, 'posts', post.content)
                if (!upload.status) throw upload.message
                post.content = upload.path
            }
            post.description = description
            await post.save()
            return response(res, post.content.split('/')[post.content.split('/').length - 1])
        } catch (error) {
            return response(res, error, +500)
        }
    },
    delete: async (req, res) => {
        try {
            const { postid } = req.params
            const post = await Post.findOne({ where: { id: postid } })
            if (!post) throw 'post not found'
            if (post.user_id != req.user.id) throw 'post not for you'

            remove(post.content)
            await Post.destroy({ where: { id: postid } })
            return response(res, 'Deleting ok')
        } catch (error) {
            return response(res, error, +500)
        }
    }
}