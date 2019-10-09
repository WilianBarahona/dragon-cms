'use strict'
const Page = require('../models/page')

function getPage(req, res){
    Page.findById(req.params.id)
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getPages(req, res){
    Page.find()
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
        
}

function getPagesNumber(req, res){
    Page.find()
    .then(data => {
        res.send({number: data.length})
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function updatePage(req, res){
    Page.updateOne(
        {_id: req.params.id},
        {$set:
            { 
                title: req.body.title,
                description: req.body.description,
                menuTitle: req.body.menuTitle,
                keywords: req.body.keywords,
                status: req.body.status,
                parentPage: req.body.parentPage,
                url: req.body.url,
                options: req.body.options,
                pageHtml: req.body.pageHtml,
                pageCkeditor: req.body.pageCkeditor
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

function deletePage(req, res){
    Page.deleteOne({_id: req.params.id})
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

function createPage(req, res){
    const page = new Page({
        title: req.body.title,
        description: req.body.description,
        menuTitle: req.body.menuTitle,
        keywords: req.body.keywords,
        status: req.body.status,
        parentPage: req.body.parentPage,
        url: req.body.url,
        options: req.body.options,
        pageHtml: req.body.pageHtml,
        pageCkeditor: req.body.pageCkeditor,
        settings: req.body.settings,
        type: req.body.type,
    })

    page.save()
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
    getPage,
    getPages,
    getPagesNumber,
    updatePage,
    deletePage,
    createPage
}