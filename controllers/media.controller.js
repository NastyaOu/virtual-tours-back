const db = require('../db')

class MediaController {
    async createMedia(req, res) {
        const locationId = req.params.locationId
        const {coordX, coordY, type, fileSrc} = req.body
        const newMedia = await db.query(`INSERT INTO public."Media" ("coordX", "coordY", type, "fileSrc", "idLocation") VALUES ($1, $2, $3, $4, $5) RETURNING *`, [coordX, coordY, type, fileSrc, locationId])

        res.status(201).json(newMedia.rows[0])
    }

    async updateMedia(req, res) {
        const mediaId = req.params.mediaId
        const {coordX, coordY} = req.body

        const media = await db.query(`UPDATE public."Media" SET "coordX" = $2, "coordY" = $3 WHERE "idMedia" = $1 RETURNING *`, [mediaId, coordX, coordY])

        res.status(200).json(media.rows[0])
    }

    async deleteMedia(req, res) {
        const mediaId = req.params.mediaId
        const media = await db.query(`DELETE FROM public."Media" WHERE "idMedia" = $1`, [mediaId])
        
        res.status(204).json(media.rows[0])
    }
}

module.exports = new MediaController()