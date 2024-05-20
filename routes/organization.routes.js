const { Router } = require('express')
const organizationController = require('../controllers/organization.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const { uploadImage } = require('../upload')

const router = new Router()

router.get('/organization', organizationController.getOrganizations)
router.get('/organization/:id', organizationController.getOrganization)
router.post(
	'/organization',
	authMiddleware,
	uploadImage.single('image'),
	organizationController.createOrganization
)
router.put(
	'/organization/:id',
	authMiddleware,
	uploadImage.single('image'),
	organizationController.updateOrganization
)
router.delete(
	'/organization/:id',
	authMiddleware,
	organizationController.deleteOrganization
)

module.exports = router
