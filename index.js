const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded( {extended: true} ))
app.use(express.json())

app.get('/teste', (req, res) => {
    res.send('Servidor em conexão...')
})

app.listen(port, () => console.log(`Server running on port: ${port}...`))