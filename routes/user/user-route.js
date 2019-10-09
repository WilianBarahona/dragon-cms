'use strict'
const express = require('express')
const userCtrl = require('../../controllers/user/user')
const auth = require('../../middlewares/authUser')

const router = express.Router()

router.get('/dataUser', auth, userCtrl.getUserData)
router.post('/login', userCtrl.loginUser)
router.post('/registro', userCtrl.createUser)
router.post('/logout', auth, userCtrl.logoutUser)

module.exports = router