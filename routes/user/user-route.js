'use strict'
const express = require('express')
const userCtrl = require('../../controllers/user/user')
const entryCtrl = require('../../controllers/entry')
const commentCtrl = require('../../controllers/comment')

const auth = require('../../middlewares/authUser')

const router = express.Router()

router.get('/commentsByEntry/:entryId', auth, commentCtrl.getCommentsByEntry)

router.get('/dataUser', auth, userCtrl.getUserData)
router.post('/login', userCtrl.loginUser)
router.post('/registro', userCtrl.createUser)
router.post('/logout', auth, userCtrl.logoutUser)

router.get('/entries/:id', auth, entryCtrl.getEntry)
router.get('/entries/', auth, entryCtrl.getEntries)
router.get('/number', auth, entryCtrl.getEntriesNumber)

router.put('/entries/:id', auth, entryCtrl.updateEntry)
router.delete('/entries/:id', auth, entryCtrl.deleteEntry)

router.post('/entries/', auth, entryCtrl.createEntry)
router.post('/comments', auth, commentCtrl.createComment)

module.exports = router

module.exports = router