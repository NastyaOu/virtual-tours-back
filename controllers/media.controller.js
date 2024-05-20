const db = require('../db')
const fs = require('fs')

class MediaController {
	async createMedia(req, res) {
		const locationId = req.params.locationId
		const { coordX, coordY, type } = req.body
		const fileSrc = req.file.filename

		const newMedia = await db.query(
			`INSERT INTO public."Media" ("coordX", "coordY", type, "fileSrc", "idLocation") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
			[coordX, coordY, type, fileSrc, locationId]
		)

		res.status(201).json(newMedia.rows[0])
	}

	async updateMedia(req, res) {
		const mediaId = req.params.mediaId
		const { coordX, coordY } = req.body

		const media = await db.query(
			`UPDATE public."Media" SET "coordX" = $2, "coordY" = $3 WHERE "idMedia" = $1 RETURNING *`,
			[mediaId, coordX, coordY]
		)

		res.status(200).json(media.rows[0])
	}

	async deleteMedia(req, res) {
		const mediaId = req.params.mediaId

		const media = await db.query(
			`SELECT * FROM public."Media" WHERE "idMedia" = $1`,
			[mediaId]
		)

		await db.query(`DELETE FROM public."Media" WHERE "idMedia" = $1`, [mediaId])

		const file = media.rows[0].fileSrc

		fs.unlink(`public/${file}`, err => {
			if (err) throw err
		})

		res.status(204).json(media.rows[0])
	}
}

module.exports = new MediaController()
