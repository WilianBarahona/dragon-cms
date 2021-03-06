'use strict'
const express = require('express')
const usersCtrl = require('../../controllers/user')
const auth = require('../../middlewares/auth')

const router = express.Router()

router.get('/users/:id', auth, usersCtrl.getUser)
router.get('/users/', auth, usersCtrl.getUsers)
router.get('/userData', auth, usersCtrl.getUserAdminData)
router.get('/number', auth, usersCtrl.getUsersNumber)
router.put('/users/:id', auth, usersCtrl.updateUser)
router.delete('/users/:id', auth, usersCtrl.deleteUser)
router.post('/users/', auth, usersCtrl.createUser)
router.post('/users/login', usersCtrl.loginUserAdmin)
router.post('/users/logout', auth, usersCtrl.logoutUserAdmin)

module.exports = router