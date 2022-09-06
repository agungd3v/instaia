const router = require('express').Router()
const middleware = require('../middleware/index')
const UserController = require('../controllers/UserController')

router.use(middleware)
router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)

module.exports = router