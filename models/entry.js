'use strict'
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title: String,
    autorId: mongoose.Types.ObjectId,
    autorName: String,
    imageId: mongoose.Types.ObjectId,
    commentary: Boolean,
    postHtml: String,
    categoryId: mongoose.Types.ObjectId,
    categoryName: String,
    date: {type: Date, default: Date.now()}

})

module.exports = mongoose.model('entries', entrySchema)