
//if not in production then load the dotenv module for environmental variables
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//create required files to import
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
//index router for the index file
const indexRouter = require('./routes/index')

//setup the views and deafults for site
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//import mongo db 

const mongoose = require ('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

//log if connected
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

//set default port or 3000 if no ohter port specified 
app.listen(process.env.PORT || 3000)