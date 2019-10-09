'use strict'
const express = require('express')
const categoryCtrl = require('../../controllers/category')
const auth = require('../../middlewares/auth')

const router = express.Router()

router.get('/categories/:id', categoryCtrl.getCategory)
router.get('/categories/', categoryCtrl.getCategories)
router.put('/categories/:id', categoryCtrl.updateCategory)
router.delete('/categories/:id', categoryCtrl.deleteCategory)
router.post('/categories/', categoryCtrl.createCategory)

module.exports = router