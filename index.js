const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'form.html'))
})

app.get('/welcome', function(req, res, next){
  const messages = 'Hello '+req.session.name
  res.send(messages)
})

app.get('/logout', function(req,res,next){
  req.session.destroy(function(err) {
  })
  res.send('log out')
})



app.listen(3000)
