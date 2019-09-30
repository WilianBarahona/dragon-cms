'use strict'
const express = require('express');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const config = require('./config')

//Routers
const filesRoute = require('./routes/file-route')
const usersRoute = require('./routes/user-route')

//Modules 
const database = require('./modules/database')

const app = express();

//Middlewares
app.use(express.static("private")); //Carpeta publica
app.use(express.static("public")); //Carpeta publica

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

//Middlewares routers
app.use('/files', filesRoute)
app.use('/users', usersRoute)

app.listen(config.port, function(){
    console.log(`Servidor levantado port: ${config.port}`);
});