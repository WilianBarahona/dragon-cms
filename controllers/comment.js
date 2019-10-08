'use strict'
const Comment = require('../models/comment')
const mongoose = require('mongoose')

function getComment(req, res){
    Comment.findById(req.params.id)
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })

}

function getComments(req, res){
    Comment.find()
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getCommentsByEntry(req, res){
    Comment.aggregate([
        {
          '$lookup': {
                'from': 'users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'user'
            }
        },
        {
          '$lookup': {
                'from': 'entries', 
                'localField': 'entryId', 
                'foreignField': '_id', 
                'as': 'entry'
            }
        }, 
        {
            '$match': {
                'entryId': mongoose.Types.ObjectId(req.params.entryId)
            }

        },
        {
          '$project': {
                '_id': true, 
                'date': true, 
                'comment': true, 
                'reported': true, 
                'user._id': true, 
                'user.firstName': true, 
                'user.lastName': true, 
                'user.avatar': true, 
                'entry._id': true, 
                'entry.title': true
          }
        }
      ])
      .then(data=>{
            res.send(data)
            res.end()
        })
        .catch(err => {
            res.send(err)
            res.end()
        })
}

function updateComment(req, res){
    Comment.updateOne(
        {_id: req.params.id},
        //$set: actualizar solo ciertos parametros
        {$set:
            {
                reported: req.body.reported
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

function deleteComment(req, res){
    Comment.deleteOne({_id: req.params.id})
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })

}

function createComment(req, res){
    const comment = new Comment({
        comment: req.body.comment,
        userId: req.body.userId,
        entryId: req.body.entryId,
        reported: req.body.reported
    })

    comment.save()
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
    getComment,
    getComments,
    getCommentsByEntry,
    updateComment,
    deleteComment,
    createComment
}