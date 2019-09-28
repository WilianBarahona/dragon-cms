'use strict'
const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    name: String,
    url: String,
    description: String,
    category: String,
    date: {type: Date, default: Date.now()},
    mimeType: String,
    size: String,
    thumbnail: String,
})

module.exports = mongoose.model('files', fileSchema)