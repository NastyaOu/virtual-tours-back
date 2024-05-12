const { Router } = require('express')
const transitionController = require('../controllers/transition.controller')

const router = new Router()

router.post('/location/:locationId/transition', transitionController.createTransition)
router.put('/transition/:transitionId', transitionController.updateTransition)
router.delete('/transition/:transitionId', transitionController.deleteTransition)

module.exports = router