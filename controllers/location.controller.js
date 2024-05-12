const db = require('../db')

class LocationController {
    async getLocations(req, res) {
        const organizationId = req.params.organizationId
        const locations = await db.query(`SELECT * FROM public."Location" WHERE "idOrganization" = $1`, [organizationId])
        res.status(200).json(locations.rows)
    }
    
    async getLocation(req, res) {
        const locationId = req.params.locationId
        const location = await db.query(`SELECT * FROM public."Location" WHERE "idLocation" = $1`, [locationId])
        const infoBlocks = await db.query(`SELECT * FROM public."InfoBlock" WHERE "idLocation" = $1`, [locationId])
        const media = await db.query(`SELECT * FROM public."Media" WHERE "idLocation" = $1`, [locationId])
        const transitions = await db.query(`SELECT * FROM public."Transition" WHERE "idPlacementLocation" = $1`, [locationId])

        location.rows[0].infoBlocks = infoBlocks.rows
        location.rows[0].media = media.rows
        location.rows[0].transitions = transitions.rows

        res.status(200).json(location.rows[0])
    }

    async createLocation(req, res) {
        const organizationId = req.params.organizationId
        const {name, image} = req.body
        const newLocation = await db.query(`INSERT INTO public."Location" (name, image, "idOrganization") VALUES ($1, $2, $3) RETURNING *`, [name, image, organizationId])

        res.status(201).json(newLocation.rows[0])
    }

    async updateLocation(req, res) {
        const locationId = req.params.locationId
        const {name, image} = req.body

        const location = await db.query(`UPDATE public."Location" SET "name" = $2, "image" = $3 WHERE "idLocation" = $1 RETURNING *`, [locationId, name, image])

        res.status(200).json(location.rows[0])
    }

    async deleteLocation(req, res) {
        const locationId = req.params.locationId
        const location = await db.query(`DELETE FROM public."Location" WHERE "idLocation" = $1`, [locationId])
        
        res.status(204).json(location.rows[0])
    }
}

module.exports = new LocationController()