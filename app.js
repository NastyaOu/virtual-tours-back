// этот файл является входной точкой
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const organizationRouter = require('./routes/organization.routes')
const locationRouter = require('./routes/location.routes')
const infoBlockRouter = require('./routes/info-block.routes')
const mediaRouter = require('./routes/media.routes')
const transitionRouter = require('./routes/transition.routes')
const authRouter = require('./routes/auth.routes')
const staffRouter = require('./routes/staff.routes')

const authMiddleware = require('./middlewares/auth.middleware')

const app = express()

// говорим серверу о том, что он будет использовать в качестве папки со статичными файлами папку public. туда будут помещаться все картинки, видео
app.use(express.static('public'))
// говорим ему, что он будет использовать корс
app.use(cors())
// а также говорим. что приложение будет использовать json. то есть он должен знать, что он будет преоброзовать из json формата в javascript
app.use(express.json())

// идет ряд назначения роутеров. authMiddleware смотрит есть ли такоц заголовок, как авторизация, то есть вынимает из него токен и проверяет его действительность
app.use('/api/auth', authRouter)
app.use('/api', organizationRouter)
app.use('/api', locationRouter)
app.use('/api', authMiddleware, infoBlockRouter)
app.use('/api', authMiddleware, mediaRouter)
app.use('/api', authMiddleware, transitionRouter)
app.use('/api', authMiddleware, staffRouter)

// запускает сервер, который будет реагировать на входящие запросы
// запускает на порту, который также берется из переменной окружения и представляет собой 300
const PORT = process.env.PORT

app.listen(PORT, error => {
	error
		? console.log(`Error starting server ${error}`)
		: console.log(`Server started at ${PORT}`)
})
