const db = require('../db')

class InfoBlockController {
    async createInfoBlock(req, res) {
        const locationId = req.params.locationId
        const {coordX, coordY, text} = req.body
        const newInfoBlock = await db.query(`INSERT INTO public."InfoBlock" ("coordX", "coordY", text, "idLocation") VALUES ($1, $2, $3, $4) RETURNING *`, [coordX, coordY, text, locationId])

        res.status(201).json(newInfoBlock.rows[0])
    }

    async updateInfoBlock(req, res) {
        const infoBlockId = req.params.infoBlockId
        const {coordX, coordY, text} = req.body

        const infoBlock = await db.query(`UPDATE public."InfoBlock" SET "coordX" = $2, "coordY" = $3, "text" = $4 WHERE "idInfoBlock" = $1 RETURNING *`, [infoBlockId, coordX, coordY, text])

        res.status(200).json(infoBlock.rows[0])
    }

    async deleteInfoBlock(req, res) {
        const infoBlockId = req.params.infoBlockId
        const infoBlock = await db.query(`DELETE FROM public."InfoBlock" WHERE "idInfoBlock" = $1`, [infoBlockId])
        
        res.status(204).json(infoBlock.rows[0])
    }
}

module.exports = new InfoBlockController()