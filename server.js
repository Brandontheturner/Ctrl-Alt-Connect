const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Hook up mongoURI
const db = require('./config/keys').mongoURI
// Connect to MongoDB using mongoose
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// Test Route
app.get('/', (req, res) => res.send('Hello world'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
