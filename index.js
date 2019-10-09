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
const userViewRoute = require('./routes/user-route-view')
const categoryRoute = require('./routes/category-route')
const entryRoute = require('./routes/entry-route')
const commentRoute = require('./routes/comment-route')
const pageRoute = require('./routes/page-route')


const userRoute = require('./routes/user/user-route')


//Modules 
const database = require('./modules/database')

//Server
const app = express();


//Middlewares
app.use(express.static('public')); //Carpeta publica

app.use('/admin', express.static('admin'))
app.use('/files', express.static('files-bank'))

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

//Engine handlebars

app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))

app.set('views', path.join(__dirname, 'views'));
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
app.use('/admin/comments', commentRoute)
app.use('/admin/pages', pageRoute)

app.use('/user', userRoute)

//Route pages admin
app.use('/admin', adminRoute)

//Route pages user
app.use('/', userViewRoute)


app.listen(config.port, function(){
    console.log(`Servidor levantado port: ${config.port}`);
}); 