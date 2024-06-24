const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

// берем логин, пароль, имя, фамилию
// смотрит нет ли уже таким пользователей
// если не нашли, то хэшируем пароль при помощи библиотеки bcrypt(передается сам пароль и на 7 глубину шифрования шифруется)
class AuthController {
    async register(req, res) {
        const {login, password, name, lastname} = req.body
        const candidate = await db.query(`SELECT * FROM public."Staff" WHERE login = $1`, [login])

        if (candidate.rows[0]) return res.status(400).json("Пользователь с таким логином уже зарегистрирован")

        const hashedPassword = bcrypt.hashSync(password, 7)
        
        const newStaff = await db.query(`INSERT INTO public."Staff" (name, lastname, login, password) VALUES ($1, $2, $3, $4) RETURNING *`, [name, lastname, login, hashedPassword])

        return res.status(201).json("Пользователь зарегистрирован")
    }

    // снова при помощи библиотеки bcrypt сравниваем пароль, который пришел от пользователя с паролем в бд
    // если верный, то формируем токен с помощью библиотеки jwt(jsonwebtoken)
    // вшиваются данные с идентификатором пользователя с помощью какого-то секретного ключа JWT_SECRET
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