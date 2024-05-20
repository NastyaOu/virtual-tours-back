const { Router } = require('express')
const infoBlockController = require('../controllers/info-block.controller')

const router = new Router()

router.post(
	'/location/:locationId/info-block',
	infoBlockController.createInfoBlock
)
router.put('/info-block/:infoBlockId', infoBlockController.updateInfoBlock)
router.delete('/info-block/:infoBlockId', infoBlockController.deleteInfoBlock)

module.exports = router
