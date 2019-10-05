'use strict'
const express = require('express');
const fileUpload = require('express-fileupload')
const session = require('express-session')
const hbs = require('express-handlebars')
const path = require('path')

const bodyParser = require('body-parser')
const config = require('./config')
const auth = require('./middlewares/auth')

//Routers
const filesRoute = require('./routes/file-route')
const usersRoute = require('./routes/user-route')
const adminRoute = require('./routes/admin-route')
const categoryRoute = require('./routes/category-route')
const entryRoute = require('./routes/entry-route')

//Modules 
const database = require('./modules/database')

//Server
const app = express();

//Middlewares
app.use('/admin', express.static('admin'))
app.use(express.static('public')); //Carpeta publica

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

//Engine handlebars

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))

app.set('views', path.join(__dirname, 'admin/views'));
app.set('view engine','.hbs') //usar motor de vistas con extencion .hbs

//Session 
app.use(session({
    secret:'SecretDog',
    resave: true,
    saveUninitialized: true,
}))

//Middlewares routers
app.use('/admin/files-bank', filesRoute)
app.use('/admin/users', usersRoute)
app.use('/admin/categories', categoryRoute)
app.use('/admin/entries', entryRoute)

//Route pages admin
app.use('/admin', adminRoute)


app.listen(config.port, function(){
    console.log(`Servidor levantado port: ${config.port}`);
});