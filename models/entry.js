'use strict'
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title: String,
    autorId: mongoose.Types.ObjectId,
    imageId: mongoose.Types.ObjectId,
    categoryId: mongoose.Types.ObjectId,
    commentary: Boolean,
    postHtml: String,
    postCkeditor: String,
    date: {type: Date, default: Date.now()}

})

module.exports = mongoose.model('entries', entrySchema)