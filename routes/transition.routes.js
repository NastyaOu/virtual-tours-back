const { Router } = require('express')
const transitionController = require('../controllers/transition.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post(
	'/location/:locationId/transition',
	authMiddleware,
	transitionController.createTransition
)
router.put(
	'/transition/:transitionId',
	authMiddleware,
	transitionController.updateTransition
)
router.delete(
	'/transition/:transitionId',
	authMiddleware,
	transitionController.deleteTransition
)

module.exports = router
