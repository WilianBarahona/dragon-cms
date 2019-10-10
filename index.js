'use strict'
const express = require('express');
const fileUpload = require('express-fileupload')
const session = require('express-session')
const hbs = require('express-handlebars')
const path = require('path')

const bodyParser = require('body-parser')
const config = require('./config')
const auth = require('./middlewares/auth')

//Routers Admin
const filesRoute = require('./routes/admin/file-route')
const usersRoute = require('./routes/admin/user-route')
const categoryRoute = require('./routes/admin/category-route')
const entryRoute = require('./routes/admin/entry-route')
const commentRoute = require('./routes/admin/comment-route')
const pageRoute = require('./routes/admin/page-route')

//Routers views
const adminRouteView = require('./routes/view/admin-route-view')
const userRouteView = require('./routes/view/user-route-view')

//Router users
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
app.use(bodyParser.urlencoded({ extended: true })) 
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

//Middlewares routers admin
app.use('/admin/files-bank', filesRoute)
app.use('/admin/users', usersRoute)
app.use('/admin/categories', categoryRoute)
app.use('/admin/entries', entryRoute)
app.use('/admin/comments', commentRoute)
app.use('/admin/pages', pageRoute)


//Middlewares routers user
app.use('/user', userRoute)

//Route views admin
app.use('/admin', adminRouteView)

//Route views user
app.use('/', userRouteView)


app.listen(config.port, function(){
    console.log(`Servidor levantado port: ${config.port}`);
}); 