if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv') // her laver du variablen
  //load values from the ./env file
  dotenv.config({path: '.env'}); // Her loader du 
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors') // til Author siden

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout') //header og footer
app.use(expressLayouts)
app.use(express.static('public')) //style, images og javascript
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 5000) // hvilken port den skal lytte til  