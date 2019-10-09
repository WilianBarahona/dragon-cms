'use strict'
const Menu = require('../models/menu')

function getMenu(req, res){
    Menu.findById(req.params.id)
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
}

function getMenus(req, res){
    Menu.find()
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
        
}

function updateMenu(req, res){
    Menu.updateOne(
        {_id: req.params.id},
        {$set:
            { 
                menuName: req.body.menuName,
                options: req.body.options
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

function deleteMenu(req, res){
    Menu.deleteOne({_id: req.params.id})
    .then(data=>{
        res.send(data)
        res.end()
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
    
}

function createMenu(req, res){
    const menu = new Menu({
        menuName: req.body.menuName,
        options: req.body.options
    })

    menu.save()
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
    getMenu,
    getMenus,
    getMenusNumber,
    updateMenu,
    deleteMenu,
    createMenu
}