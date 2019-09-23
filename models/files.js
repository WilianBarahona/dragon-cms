'use strict'
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: String,
    url: String,
    category: String,
    date: {type: Date, default: Date.now()},
    mimeType: String,
    size: String
})

module.exports = mongoose.model('files', fileSchema)