const { Router } = require('express')
const locationController = require('../controllers/location.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const { uploadImage } = require('../upload')

const router = new Router()

// здесь мы описываем пути, по которым будет реагировать программа и назначаем функции, которые будут выполняться по этому пути
// реакции на запросы по путем находятся в папке контроллеров (controllers)
router.get(
	'/organization/:organizationId/location',
	locationController.getLocations
)
router.get('/location/:locationId', locationController.getLocation)
router.post(
	'/organization/:organizationId/location',
	authMiddleware,
	// засчет библиотеки малтер uploadImage назначает новому файлу хранилище и фильтрует изображение
	uploadImage.single('image'),
	locationController.createLocation
)
router.put(
	'/location/:locationId',
	authMiddleware,
	uploadImage.single('image'),
	locationController.updateLocation
)
router.delete(
	'/location/:locationId',
	authMiddleware,
	locationController.deleteLocation
)

module.exports = router
