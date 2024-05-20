const { Router } = require('express')
const mediaController = require('../controllers/media.controller')

const { uploadMedia } = require('../upload')

const router = new Router()

router.post(
	'/location/:locationId/media',
	uploadMedia.single('file'),
	mediaController.createMedia
)
router.put('/media/:mediaId', mediaController.updateMedia)
router.delete('/media/:mediaId', mediaController.deleteMedia)

module.exports = router
