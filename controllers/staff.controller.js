const db = require('../db')

class StaffController {
	async getStaff(req, res) {
		const staff = await db.query(`SELECT * FROM public."Staff"`)
		res.status(200).json(staff.rows)
	}

	async getOneStaff(req, res) {
		const id = req.params.id
		const staff = await db.query(
			`SELECT * FROM public."Staff" WHERE "idStaff" = $1`,
			[id]
		)

		res.status(200).json(staff.rows[0])
	}

	async updateStaff(req, res) {
		const id = req.params.id
		const { name, lastname } = req.body

		const updatedStaff = await db.query(
			`UPDATE public."Staff" SET "name" = $2, "lastname" = $3 WHERE "idStaff" = $1 RETURNING *`,
			[id, name, lastname]
		)

		res.status(200).json(updatedStaff.rows[0])
	}

	async deleteStaff(req, res) {
		const id = req.params.id

		await db.query(`DELETE FROM public."Staff" WHERE "idStaff" = $1`, [id])

		res.status(204).json()
	}
}

module.exports = new StaffController()
