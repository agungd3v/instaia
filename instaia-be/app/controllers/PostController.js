const { Post, Comment, sequelize } = require('../models')
const { response } = require('../helpers/response')
const { remove, uploadPublicPath } = require('../helpers/upload')

module.exports = {
    index: async (req, res) => {
        try {
            const posts = await Post.findAll({
                include: [{
                    all: true,
                    attributes: {
                        exclude: ['password', 'email', 'phone', 'created_at', 'updated_at']
                    }
                }],
                order: [
                    ['id', 'desc']
                ]
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
    },
    likepost: async (req, res) => {
        try {
            const { postid } = req.body
            const query = `
                INSERT INTO post_likes (user_id, post_id, created_at, updated_at)
                VALUES (${req.user.id}, ${postid}, datetime('now'), datetime('now'))
            `
            await sequelize.query(query, { type: sequelize.QueryTypes.INSERT })
            return response(res, 'like success')
        } catch (error) {
            return response(res, error, +500)
        }
    },
    commentpost: async (req, res) => {
        try {
            const { postid, comment } = req.body
            const post = await Post.findOne({ where: { id: postid } })
            if (!post) throw 'Post not found'

            const storeComment = await Comment.create({
                user_id: req.user.id,
                post_id: post.id,
                comment: comment
            })
            return response(res, storeComment)
        } catch (error) {
            return response(res, error, +500)
        }
    }
}