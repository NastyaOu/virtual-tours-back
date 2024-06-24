const multer = require('multer')

// описывает куда будут улетать пришедшие файлы и под каким именем
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public')
	},
	// имя формируется текщей датой и оригинальным названием файла
	filename: function (req, file, cb) {
		cb(null, Date.now().toString() + '-' + file.originalname)
	},
})

// смотрит на имя файла, вычисляет расширение(4 символа с конца)
const imageFilter = function (req, file, cb) {
	const fileName = file.originalname
	const ext = fileName.slice(fileName.length - 4, fileName.length)

	if (ext !== '.png' && ext !== '.jpg') cb(null, false)
	else cb(null, true)
}

const mediaFilter = function (req, file, cb) {
	const fileName = file.originalname
	const ext = fileName.slice(fileName.length - 4, fileName.length)

	const isImgExtValid = ext === '.png' || ext === '.jpg'

	const isVideoExtValid = ext === '.mp4'

	if (req.body.type === 'photo' && isImgExtValid) cb(null, true)
	else if (req.body.type === 'video' && isVideoExtValid) cb(null, true)
	else cb(null, false)
}

const uploadImage = multer({ storage: storage, fileFilter: imageFilter })

const uploadMedia = multer({ storage: storage, fileFilter: mediaFilter })

module.exports = {
	uploadImage,
	uploadMedia,
}
