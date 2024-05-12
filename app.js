require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, error => {
    error ? console.log(`Error starting server ${error}`) : console.log(`Server started at ${PORT}`)
})