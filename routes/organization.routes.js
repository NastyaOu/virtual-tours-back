const { Router } = require('express')
const organizationController = require('../controllers/organization.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = new Router()

router.get('/organization', organizationController.getOrganizations)
router.get('/organization/:id', organizationController.getOrganization)
router.post('/organization', authMiddleware, organizationController.createOrganization)
router.put('/organization/:id', authMiddleware, organizationController.updateOrganization)
router.delete('/organization/:id', authMiddleware, organizationController.deleteOrganization)

module.exports = router