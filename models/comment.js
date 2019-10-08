'use strict'
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: String,
    userId: mongoose.Types.ObjectId,
    entryId: mongoose.Types.ObjectId,
    date: {type: Date, default: Date.now()},
    reported: Boolean
})

module.exports = mongoose.model('comments', commentSchema)