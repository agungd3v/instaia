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
// User router
router.post('/avatar', UserController.changePhoto)
// Post route
router.get('/post', PostController.index)
router.post('/post', PostController.store)
router.put('/post/:postid', PostController.update)
router.delete('/post/:postid', PostController.delete)

module.exports = router
