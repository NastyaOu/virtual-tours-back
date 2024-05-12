const db = require('../db')

class OrganizationController {
    async getOrganizations(req, res) {
        const organizations = await db.query(`SELECT * FROM public."Organization"`)
        res.status(200).json(organizations.rows)
    }
    
    async getOrganization(req, res) {
        const id = req.params.id
        const organization = await db.query(`SELECT * FROM public."Organization" WHERE "idOrganization" = $1`, [id])
        res.status(200).json(organization.rows[0])
    }

    async createOrganization(req, res) {
        const {name, description, image} = req.body
        const newOrganization = await db.query(`INSERT INTO public."Organization" (name, description, image) VALUES ($1, $2, $3) RETURNING *`, [name, description, image])
        res.status(201).json(newOrganization.rows[0])
    }

    async updateOrganization(req, res) {
        const id = req.params.id
        const {name, description, image} = req.body

        const organization = await db.query(`UPDATE public."Organization" SET "name" = $2, "description" = $3, "image" = $4 WHERE "idOrganization" = $1 RETURNING *`, [id, name, description, image])
        res.status(200).json(organization.rows[0])
    }

    async deleteOrganization(req, res) {
        const id = req.params.id
        const organization = await db.query(`DELETE FROM public."Organization" WHERE "idOrganization" = $1`, [id])
        res.status(204).json(organization.rows[0])
    }
}

module.exports = new OrganizationController()