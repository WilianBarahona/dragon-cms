'use strict'
const express = require('express')
const auth = require('../middlewares/authUser')

const router = express.Router()

router.get('/login', (req, res)=>{
    res.render('user/login')
})

router.get('/registro', (req, res)=>{
    res.render('user/registro')
})

router.get('/index',auth, (req, res)=>{
    res.render('user/index')
})

router.get('', (req, res)=>{
    res.render('user/landing')
})

router.get('/html', (req, res)=>{
    res.setHeader('Content-type', 'text/html');
    res.write('<h1>html</h1>')
    res.end()
})

module.exports = router