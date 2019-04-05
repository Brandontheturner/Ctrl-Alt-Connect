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

// Connect route files to server
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
