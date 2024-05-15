const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/login', authController.login)
router.post('/register', authMiddleware, authController.register)

module.exports = router
