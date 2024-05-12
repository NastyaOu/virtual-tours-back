const db = require('../db')

class TransitionController {
    async createTransition(req, res) {
        const locationId = req.params.locationId
        const {coordX, coordY, targetLocationId} = req.body
        const newTransition = await db.query(`INSERT INTO public."Transition" ("coordX", "coordY", "idPlacementLocation", "idTargetLocation") VALUES ($1, $2, $3, $4) RETURNING *`, [coordX, coordY, locationId, targetLocationId])

        res.status(201).json(newTransition.rows[0])
    }

    async updateTransition(req, res) {
        const transitionId = req.params.transitionId
        const {coordX, coordY} = req.body

        const transition = await db.query(`UPDATE public."Transition" SET "coordX" = $2, "coordY" = $3 WHERE "idTransition" = $1 RETURNING *`, [transitionId, coordX, coordY])

        res.status(200).json(transition.rows[0])
    }

    async deleteTransition(req, res) {
        const transitionId = req.params.transitionId
        const transition = await db.query(`DELETE FROM public."Transition" WHERE "idTransition" = $1`, [transitionId])
        
        res.status(204).json(transition.rows[0])
    }
}

module.exports = new TransitionController()