
//if not in production then load the dotenv module for environmental variables
//On Heroku this will be configured with Mongo Atlast DB for database 
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//create required files to import
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
//index router for the index file
const indexRouter = require('./routes/index')
//author router
const authorRouter  = require('./routes/authors')

//body parser module
const bodyParser = require('body-parser')

//setup the views and deafults for site
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
//use body parser
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//import mongo db 

const mongoose = require ('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})

//log if connected by creating a mongoose connection variable and loggin either the error or success 
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


//set default path for website 
app.use('/', indexRouter)
//all authors files are prepended with /authors 
app.use('/authors', authorRouter)

//set default port or 3000 if no ohter port specified 
app.listen(process.env.PORT || 3000)


//to start the server
// npm run devStart 