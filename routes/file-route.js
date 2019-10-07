'use strict'
const express = require('express')
const filesCtrl = require('../controllers/file')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/files/:id', auth, filesCtrl.getFile)
router.get('/files/', auth, filesCtrl.getFiles)
router.get('/number/', auth, filesCtrl.getFilesNumber)
router.put('/files/:id', auth, filesCtrl.updateFile)
router.delete('/files/:id', auth, filesCtrl.deletFile)
router.post('/files/', auth, filesCtrl.createFile)

module.exports = router