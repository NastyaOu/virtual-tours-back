const { Router } = require('express')
const locationController = require('../controllers/location.controller')

const router = new Router()

router.get('/organization/:organizationId/location', locationController.getLocations)
router.get('/location/:locationId', locationController.getLocation)
router.post('/organization/:organizationId/location', locationController.createLocation)
router.put('/location/:locationId', locationController.updateLocation)
router.delete('/location/:locationId', locationController.deleteLocation)

module.exports = router