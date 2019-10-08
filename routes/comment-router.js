'use strict'
const express = require('express')
const commentCtrl = require('../controllers/comment')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/comments/:id', auth, commentCtrl.getComment)
router.get('/commentsByEntry/:entryId', auth, commentCtrl.getCommentsByEntry)
router.get('/comments', auth, commentCtrl.getComments)
router.put('/comments/:id', auth, commentCtrl.updateComment)
router.delete('/comments/:id', auth, commentCtrl.deleteComment)
router.post('/comments', auth, commentCtrl.createComment)


module.exports = router