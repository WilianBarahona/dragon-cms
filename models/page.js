'use strict'
const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    title: String,
    description: String,
    menuTitle: String,
    keywords: String,
    status: Boolean,
    parentPage: mongoose.Types.ObjectId,
    url: String,
    options: mongoose.SchemaTypes.Mixed,
    settings: mongoose.SchemaTypes.Mixed,
    type: String,
    pageHtml: String,
    pageCkeditor: String
})

module.exports = mongoose.model('pages', pageSchema)