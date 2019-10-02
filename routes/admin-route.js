'use strict'
const express = require('express')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/dashboard',auth, (req, res)=>{
    res.render('dashboard')
})
  
router.get('/entries', auth, (req, res)=>{
    res.render('entries')
})

router.get('/files-bank', auth, (req, res)=>{
    res.render('files-bank')
})

router.get('/login', (req, res)=>{
    res.render('login')
})
router.get('/new-entry', auth, (req, res)=>{
    res.render('new-entry')
})

router.get('/new-page', auth, (req, res)=>{
    res.render('new-page')
})

router.get('/pages', auth, (req, res)=>{
    res.render('pages')
})

router.get('/users', auth, (req, res)=>{
    res.render('users')
})

router.get('*', auth, (req, res)=>{
    res.render('dashboard')
})

module.exports = router