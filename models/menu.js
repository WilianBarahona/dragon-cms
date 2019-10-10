'use strict'
const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    menuName: String,
    options: mongoose.SchemaTypes.Mixed
})

module.exports = mongoose.model('menus', menuSchema)