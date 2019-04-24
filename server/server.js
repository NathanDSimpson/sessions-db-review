require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const ctrl = require('./controller')
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const session = require('express-session')

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
massive(CONNECTION_STRING).then((dbInstance) => {
  app.set('db', dbInstance)
})

app.get('/messages', ctrl.getMessages)
app.post('/message', ctrl.addMessage)
app.put('/race', ctrl.updateRace)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
