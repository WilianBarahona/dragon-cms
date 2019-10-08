'use strict'
const express = require('express')
const userCtrl = require('../../controllers/user/user')

const router = express.Router()

router.get('/dataUser', categoryCtrl.dataUser)
router.post('/login', userCtrl.loginUser)
router.post('/registro', userCtrl.registroUser)

module.exports = router