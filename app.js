require('dotenv').config()
const express = require('express')
const cors = require('cors')
const organizationRouter = require('./routes/organization.routes')
const locationRouter = require('./routes/location.routes')
const infoBlockRouter = require('./routes/info-block.routes')
const mediaRouter = require('./routes/media.routes')
const transitionRouter = require('./routes/transition.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', organizationRouter)
app.use('/api', locationRouter)
app.use('/api', infoBlockRouter)
app.use('/api', mediaRouter)
app.use('/api', transitionRouter)

const PORT = process.env.PORT

app.listen(PORT, error => {
    error ? console.log(`Error starting server ${error}`) : console.log(`Server started at ${PORT}`)
})