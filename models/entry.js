'use strict'
const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title:String,
    autor: mongoose.Types.ObjectId,
    image: mongoose.Types.ObjectId,
    commentary: Boolean,
    postHtml:String,
    category: mongoose.Types.ObjectId,
    date: {type: Date, default: Date.now()}

})

module.exports = mongoose.model('entries', entrySchema)