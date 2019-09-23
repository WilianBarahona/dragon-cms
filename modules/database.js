'use strict'
const mongoose = require('mongoose')
const config = require('../config')

class Database{
    constructor(){
        //Promesa
        mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log(`Se conecto a mongo db port: 27017`)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = new Database();