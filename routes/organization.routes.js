const { Router } = require('express')
const organizationController = require('../controllers/organization.controller')

const router = new Router()

router.get('/organization', organizationController.getOrganizations)
router.get('/organization/:id', organizationController.getOrganization)
router.post('/organization', organizationController.createOrganization)
router.put('/organization/:id', organizationController.updateOrganization)
router.delete('/organization/:id', organizationController.deleteOrganization)

module.exports = router