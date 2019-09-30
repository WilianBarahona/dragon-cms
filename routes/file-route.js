'use strict'
const express = require('express')
const filesCtrl = require('../controllers/file')

const router = express.Router()

router.get('/:id', filesCtrl.getFile)
router.get('/', filesCtrl.getFiles)
router.put('/:id', filesCtrl.updateFile)
router.delete('/:id', filesCtrl.deletFile)
router.post('/', filesCtrl.createFile)

module.exports = router