'use strict'
const express = require('express')
const usersCtrl = require('../controllers/user')

const router = express.Router()

router.get('/:id', usersCtrl.getUser)
router.get('/', usersCtrl.getUsers)
router.put('/:id', usersCtrl.updateUser)
router.delete('/:id', usersCtrl.deleteUser)
router.post('/', usersCtrl.createUser)
router.post('/singin', usersCtrl.singIn)

module.exports = router