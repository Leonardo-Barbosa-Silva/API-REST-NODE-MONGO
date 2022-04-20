const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/routes.js')
require('dotenv').config()
const port = 3000

app.use(express.urlencoded( {extended: true} ))
app.use(express.json())

app.get('/teste', (req, res) => {
    res.send('Servidor em conexão...')
})

app.use('/person', routes)


const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-cluster.zqywr.mongodb.net/BancoAPI?retryWrites=true&w=majority`
)
    .then( () => {
        app.listen(port, () => console.log(`Server running on port: ${port}...`))
    })
    .catch( (err) => {
        console.log(err)
    })