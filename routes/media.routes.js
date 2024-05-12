const { Router } = require('express')
const mediaController = require('../controllers/media.controller')

const router = new Router()

router.post('/location/:locationId/media', mediaController.createMedia)
router.put('/media/:mediaId', mediaController.updateMedia)
router.delete('/media/:mediaId', mediaController.deleteMedia)

module.exports = router