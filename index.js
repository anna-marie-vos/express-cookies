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
  req.session.name = 'Garfield'
  next()
})

app.get('/', function (req, res, next) {
  // console.log('req.headers', req.headers);
  res.send(req.session.name)
})

app.get('/welcome', function(req, res, next){
  const messages = 'Hello '+req.session.name
  res.send(messages)
})




app.listen(3000)
