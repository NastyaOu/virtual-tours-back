const db = require('../db')
const fs = require('fs')

class OrganizationController {
	async getOrganizations(req, res) {
		const organizations = await db.query(`SELECT * FROM public."Organization"`)
		res.status(200).json(organizations.rows)
	}

	async getOrganization(req, res) {
		const id = req.params.id
		const organization = await db.query(
			`SELECT * FROM public."Organization" WHERE "idOrganization" = $1`,
			[id]
		)
		const organizationHistory = await db.query(
			`SELECT * FROM public."History" WHERE "idOrganization" = $1`,
			[id]
		)

		const history = organizationHistory.rows.map(
			historyElement => historyElement.text
		)
		organization.rows[0].history = history

		res.status(200).json(organization.rows[0])
	}

	async createOrganization(req, res) {
		const { name, description, history } = req.body
		const image = req.file.filename

		const newOrganization = await db.query(
			`INSERT INTO public."Organization" (name, description, image) VALUES ($1, $2, $3) RETURNING *`,
			[name, description, image]
		)

		const id = newOrganization.rows[0].idOrganization

		const historyArray = JSON.parse(history)

		historyArray.forEach(async historyElement => {
			const newHistory = await db.query(
				`INSERT INTO public."History" (text, "idOrganization") VALUES ($1, $2)`,
				[historyElement, id]
			)
		})

		newOrganization.rows[0].history = historyArray

		res.status(201).json(newOrganization.rows[0])
	}

	async updateOrganization(req, res) {
		const id = req.params.id
		const { name, description, history } = req.body
		const image = req.file.filename

		const organization = await db.query(
			`SELECT * FROM public."Organization" WHERE "idOrganization" = $1`,
			[id]
		)

		const prevImage = organization.rows[0].image

		fs.unlink(`public/${prevImage}`, err => {
			if (err) throw err
		})

		const updatedOrganization = await db.query(
			`UPDATE public."Organization" SET "name" = $2, "description" = $3${
				image ? ', "image" = $4' : ''
			} WHERE "idOrganization" = $1 RETURNING *`,
			[id, name, description, image]
		)

		await db.query(`DELETE FROM public."History" WHERE "idOrganization" = $1`, [
			id,
		])

		history.forEach(async historyElement => {
			const newHistory = await db.query(
				`INSERT INTO public."History" (text, "idOrganization") VALUES ($1, $2)`,
				[historyElement, id]
			)
		})

		updatedOrganization.rows[0].history = history

		res.status(200).json(updatedOrganization.rows[0])
	}

	async deleteOrganization(req, res) {
		const id = req.params.id
		const organization = await db.query(
			`SELECT * FROM public."Organization" WHERE "idOrganization" = $1`,
			[id]
		)

		await db.query(
			`DELETE FROM public."Organization" WHERE "idOrganization" = $1`,
			[id]
		)
		await db.query(`DELETE FROM public."History" WHERE "idOrganization" = $1`, [
			id,
		])

		const image = organization.rows[0].image

		fs.unlink(`public/${image}`, err => {
			if (err) throw err
		})

		res.status(204).json()
	}
}

module.exports = new OrganizationController()
