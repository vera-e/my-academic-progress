const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')

// Connect to database
mongoose.connect(config.database)

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to db ' + config.database)
})

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err)
})

const app = express()

// Import Controller
const usersController = require('./controller/usersController')
const courseController = require('./controller/coursesController')

// Port Number
const port = 3000

// CORS middleware
app.use(cors())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser middleware
app.use(bodyParser.json())

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use('/users', usersController)
app.use('/course', courseController)

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint')
})

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
