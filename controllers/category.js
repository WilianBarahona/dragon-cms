'use strict'
const Category = require('../models/category')

function getCategory(req, res){
    Category.findById(req.params.id)
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })

}

function getCategories(req, res){
    Category.find()
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function updateCategory(req, res){
    Category.updateOne(
        {_id: req.params.id},
        //$set: actualizar solo ciertos parametros
        {$set:
            {category: req.body.category,
             description: req.body.description
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

function deleteCategory(req, res){
    Category.deleteOne({_id: req.params.id})
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })

}

function createCategory(req, res){
    const category = new Category({
        category: req.body.category,
        description: req.body.description,
    })

    category.save()
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
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory
}