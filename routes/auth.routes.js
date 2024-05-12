const { Router } = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post('/register', authMiddleware, authController.register)
router.post('/login', authController.login)

module.exports = router