'use strict'
const mongoose = require('mongoose')
const config = require('../config')
const User = require('../models/user')
const Page = require('../models/page')

class Database{
    constructor(){
        //Promesa
        mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true ,  useCreateIndex: true})
        .then(()=>{
            console.log(`Se conecto a mongo db port: 27017`)
            User.find()
            .then(data=>{
                if(data.length == 0){
                    //La primera vez que se conecte, crear un usuario por defecto     
                    const user = new User({
                        firstName: 'Dragon',
                        lastName: 'CMS',
                        password: 'admin',
                        email: 'admin@dragon.com',
                        type: 'Admin'
                    })
                
                    user.avatar = user.gravatar()
                
                    user.save()
                    .then(data => {
                       console.log('Usuario por defecto creado con exito')
                    })
                    .catch(err => {
                       console.log('Error no se pudo crear el usuario por defecto')
                    })
                }
            })
            .catch(err=>{
                console.log(`No se pudo crear el usuario por defecto ${err}`)
            })

            //Page default
            Page.find()
            .then(data=>{
                if(data.length == 0){
                    //La primera vez que se conecte, crear un usuario por defecto     
                    const page = new Page({
                        title: 'Pagina principal',
                        description: 'Esta es la pagina principal',
                        menuTitle: 'Home',
                        keywords: ['Principal', 'Home', 'Inicio'],
                        status: true,
                        parentPage: null,
                        url: String,
                        options: {
                            header: false,
                            footer: false,
                            menu: false,
                            breadcrumb: false
                        },
                        settings: {},
                        type: 'principal',
                        pageHtml: '<h1>Pagina principal<h1>',
                        pageCkeditor: '<h1>Pagina principal<h1>'
                    })
                
                    page.save()
                    .then(data => {
                       console.log('Pagina por defecto creado con exito')
                    })
                    .catch(err => {
                       console.log('Error no se pudo crear la pagina por defecto')
                    })
                }
            })
            .catch(err=>{
                console.log(`No se pudo crear el usuario por defecto ${err}`)
            })
            User.find()
            .then(data=>{
                if(data.length == 0){
                    //La primera vez que se conecte, crear un usuario por defecto     
                    const user = new User({
                        firstName: 'Dragon',
                        lastName: 'CMS',
                        password: 'admin',
                        email: 'admin@dragon.com',
                        type: 'Admin'
                    })
                
                    user.avatar = user.gravatar()
                
                    user.save()
                    .then(data => {
                       console.log('Usuario por defecto creado con exito')
                    })
                    .catch(err => {
                       console.log('Error no se pudo crear el usuario por defecto')
                    })
                }
            })
            .catch(err=>{
                console.log(`No se pudo crear el usuario por defecto ${err}`)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = new Database();