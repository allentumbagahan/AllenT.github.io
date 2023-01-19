console.log("allen")
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

/* Middleware */
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
/* Routes */
const accountsRoute = require('./routes/Accounts')
app.use('/accounts', accountsRoute)

const port = 3000

app.listen(port, () => {
    console.log("Listening on port: ", port)
})
