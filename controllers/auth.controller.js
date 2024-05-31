const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

class AuthController {
    async register(req, res) {
        const {login, password, name, lastname} = req.body
        const candidate = await db.query(`SELECT * FROM public."Staff" WHERE login = $1`, [login])

        if (candidate.rows[0]) return res.status(400).json("Пользователь с таким логином уже зарегистрирован")

        const hashedPassword = bcrypt.hashSync(password, 7)
        
        const newStaff = await db.query(`INSERT INTO public."Staff" (name, lastname, login, password) VALUES ($1, $2, $3, $4) RETURNING *`, [name, lastname, login, hashedPassword])

        return res.status(201).json("Пользователь зарегистрирован")
    }

    async login(req, res) {
        const {login, password} = req.body
        const user = await db.query(`SELECT * FROM public."Staff" WHERE login = $1`, [login])

        if (!user.rows[0]) return res.status(400).json("Пользователя с таким логином не существует")
        
        const isPasswordValid = bcrypt.compareSync(password, user.rows[0].password)

        if (!isPasswordValid) return res.status(400).json("Неверный пароль")

        const token = jwt.sign({id: user.rows[0].id}, JWT_SECRET)

        return res.status(200).json({
            token
        })
    }

    
}

module.exports = new AuthController()