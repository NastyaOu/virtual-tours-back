require('dotenv').config()
const express = require('express')
const cors = require('cors')
const organizationRouter = require('./routes/organization.routes')
const locationRouter = require('./routes/location.routes')
const infoBlockRouter = require('./routes/info-block.routes')
const mediaRouter = require('./routes/media.routes')
const transitionRouter = require('./routes/transition.routes')
const authRouter = require('./routes/auth.routes')
const authMiddleware = require('./middlewares/auth.middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', organizationRouter)
app.use('/api', locationRouter)
app.use('/api', authMiddleware, infoBlockRouter)
app.use('/api', authMiddleware, mediaRouter)
app.use('/api', authMiddleware, transitionRouter)
app.use('/api/auth', authRouter)

const PORT = process.env.PORT

app.listen(PORT, error => {
    error ? console.log(`Error starting server ${error}`) : console.log(`Server started at ${PORT}`)
})