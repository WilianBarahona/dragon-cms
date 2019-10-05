'use strict'
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category: String,
    description: String

})

module.exports = mongoose.model('categories', categorySchema)