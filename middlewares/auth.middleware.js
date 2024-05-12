const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") next()
    
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return res.status(403).json({message: "Пользователь не авторизован"})
        
        const isTokenValid = jwt.verify(token, JWT_SECRET)

        if (!isTokenValid) return res.status(403).json({message: "Авторизация недействительна"})

        next()
    } catch (error) {
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}