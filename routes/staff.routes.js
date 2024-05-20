const { Router } = require('express')
const staffController = require('../controllers/staff.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.get('/staff', staffController.getStaff)
router.get('/staff/:id', staffController.getOneStaff)
router.put('/staff/:id', staffController.updateStaff)
router.delete('/staff/:id', staffController.deleteStaff)

module.exports = router
