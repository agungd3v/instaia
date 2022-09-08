const router = require('express').Router()
const {
    requestOrigin,
    requestAuth,
} = require('../middleware/index')

const UserController = require('../controllers/UserController')
const PostController = require('../controllers/PostController')

router.use(requestOrigin)

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)

router.use(requestAuth)

router.post('/post', PostController.store)
router.put('/post/:postid', PostController.update)

module.exports = router
