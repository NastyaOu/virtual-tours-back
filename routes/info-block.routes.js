const { Router } = require('express')
const infoBlockController = require('../controllers/info-block.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.post(
	'/location/:locationId/info-block',
	authMiddleware,
	infoBlockController.createInfoBlock
)
router.put(
	'/info-block/:infoBlockId',
	authMiddleware,
	infoBlockController.updateInfoBlock
)
router.delete(
	'/info-block/:infoBlockId',
	authMiddleware,
	infoBlockController.deleteInfoBlock
)

module.exports = router
