var express = require('express')
var app = express()
var session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(function(req,res,next){
  next()
})

app.get('/', function (req, res, next) {
  req.session.name = 'Garfield'
  res.send(req.session.name)
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
