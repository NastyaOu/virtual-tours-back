const { Router } = require('express')
const locationController = require('../controllers/location.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.get('/organization/:organizationId/location', locationController.getLocations)
router.get('/location/:locationId', locationController.getLocation)
router.post('/organization/:organizationId/location', authMiddleware, locationController.createLocation)
router.put('/location/:locationId', authMiddleware, locationController.updateLocation)
router.delete('/location/:locationId', authMiddleware, locationController.deleteLocation)

module.exports = router