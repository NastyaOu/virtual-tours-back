const { Router } = require('express')
const mediaController = require('../controllers/media.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const { uploadMedia } = require('../upload')

const router = new Router()

router.post(
	'/location/:locationId/media',
	authMiddleware,
	uploadMedia.single('file'),
	mediaController.createMedia
)
router.put('/media/:mediaId', authMiddleware, mediaController.updateMedia)
router.delete('/media/:mediaId', authMiddleware, mediaController.deleteMedia)

module.exports = router
