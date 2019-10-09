'use strict'
const express = require('express')
const menuCtrl = require('../../controllers/menu')
const auth = require('../../middlewares/auth')

const router = express.Router()

router.get('/menus/:id', auth , menuCtrl.getMenu)
router.get('/menus', auth , menuCtrl.getMenus)
router.put('/menus/:id', auth , menuCtrl.updateMenu)
router.delete('/menus/:id', auth , menuCtrl.deleteMenu)
router.post('/menus', auth , menuCtrl.createMenu)

module.exports = router