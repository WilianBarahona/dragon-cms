'use strict'
const Entry = require('../models/entry')

function getEntry(req, res){
    Entry.findById(req.params.id)
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getEntries(req, res){
    Entry.find()
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

function updateEntry(req, res){
    Entry.updateOne(
        {_id: req.params.id},
        {$set:
            { title: req.body.title,
              autor: req.body.autor,
              image: req.body.image,
              commentary: req.body.commentary,
              postHtml: req.body.postHtml,
              category: req.body.category
            }
        }
        )
        .then(data => {
            res.send(data)
            res.end()
        })
        .catch(err => {
            res.send(err)
            res.end()
        })
    
}

function deleteEntry(req, res){
    Entry.deleteOne({_id: req.params.id})
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

function createEntry(req, res){
    const entry = new Entry({
        title: req.body.title,
        autor: req.body.autor,
        image: req.body.image,
        commentary: req.body.commentary,
        postHtml: req.body.postHtml,
        category: req.body.category
    })

    entry.save()
    .then(data => {
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

module.exports = {
    getEntry,
    getEntries,
    updateEntry,
    deleteEntry,
    createEntry
}