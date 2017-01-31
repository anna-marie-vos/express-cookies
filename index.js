const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const users = require('./table')
const _ = require('lodash')


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

app.post('/login', function(req, res, next){
const user = _.find(users.table, {name: req.body.name});
  if(!user){
    res.send('user not found')
  } else if(user.password === req.body.password){
    req.session.activeUser = user.name
    req.session.adminRights = user.admin
    res.send('logged in')
  } else{
    res.send('invalid password')
  }
})

function checkLoginDetails(req,res,next){
  const user = req.session.activeUser
    if(!user){
      res.send('access denied ')
    }
      next()
}

app.get('/private',checkLoginDetails,function(req,res,next){
  const messages = 'you are '+req.session.activeUser
  res.send(messages)
})

function checkAdminRights(req,res,next){
  const adminRights = req.session.adminRights
    if(adminRights){
      next()
    } else {
      res.send("you're not the one")
    }
}

app.get('/admin',checkAdminRights,function(req,res,next){
  res.send("you've got rights")
})

app.get('/logout', function(req,res,next){
  req.session.destroy(function(err) {
  })
  res.send('log out')
})



app.listen(3000)
