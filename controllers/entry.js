'use strict'
const Entry = require('../models/entry')
const mongoose = require('mongoose')

function getEntry(req, res){
    Entry.aggregate([
        {
            '$match':{
                '_id': mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            '$lookup': {
                'from': 'categories', 
                'localField': 'categoryId', 
                'foreignField': '_id', 
                'as': 'category'
             }
        }, 
        {
            '$lookup': {
                'from': 'users', 
                'localField': 'autorId', 
                'foreignField': '_id', 
                'as': 'autor'
             }
        }, 
        {
            '$lookup': {
                'from': 'files', 
                'localField': 'imageId', 
                'foreignField': '_id', 
                'as': 'image'
            }
        }, 
        {
            '$project': {
                '_id': true, 
                'data': true, 
                'title': true, 
                'commentary': true, 
                'postHtml': true, 
                'postCkeditor': true,
                'category._id': true, 
                'category.category': true, 
                'autor._id': true, 
                'autor.firstName': true, 
                'autor.lastName': true, 
                'image._id': true, 
                'image.url': true
             }
        }
    ])
    .then(data => {
            res.send(data)
            res.end()
        })
        .catch(err => {
            res.send(err)
            res.end()
        })
}

function getEntries(req, res){
    Entry.aggregate([
            {
                '$lookup': {
                    'from': 'categories', 
                    'localField': 'categoryId', 
                    'foreignField': '_id', 
                    'as': 'category'
                 }
            }, 
            {
                '$lookup': {
                    'from': 'users', 
                    'localField': 'autorId', 
                    'foreignField': '_id', 
                    'as': 'autor'
                 }
            }, 
            {
                '$lookup': {
                    'from': 'files', 
                    'localField': 'imageId', 
                    'foreignField': '_id', 
                    'as': 'image'
                }
            }, 
            {
                '$project': {
                    '_id': true, 
                    'data': true, 
                    'title': true, 
                    'commentary': true, 
                    'postHtml': true, 
                    'postCkeditor': true,
                    'category._id': true, 
                    'category.category': true, 
                    'autor._id': true, 
                    'autor.firstName': true, 
                    'autor.lastName': true, 
                    'image._id': true, 
                    'image.url': true
                 }
            }
      ])
      .then(data => {
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
              imageId: req.body.imageId,
              categoryId: req.body.categoryId,
              commentary: req.body.commentary,
              postHtml: req.body.postHtml,
              postCkeditor: req.body.postCkeditor
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
        autorId: req.body.autorId,
        imageId: req.body.imageId,
        categoryId: req.body.categoryId,
        commentary: req.body.commentary,
        postHtml: req.body.postHtml,
        postCkeditor: req.body.postCkeditor
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