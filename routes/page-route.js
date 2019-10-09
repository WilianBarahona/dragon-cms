'use strict'
const express = require('express')
const pageCtrl = require('../controllers/page')

const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/pages/:id', auth , pageCtrl.getPage)
router.get('/pages', auth , pageCtrl.getPages)
router.get('/number', auth , pageCtrl.getPagesNumber)
router.put('/pages/:id', auth , pageCtrl.updatePage)
router.delete('/pages/:id', auth , pageCtrl.deletePage)
router.post('/pages', auth , pageCtrl.createPage)

module.exports = router