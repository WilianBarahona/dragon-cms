'use strict'
const express = require('express')
const entryCtrl = require('../controllers/entry')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/entries/:id', auth, entryCtrl.getEntry)
router.get('/entries/', auth, entryCtrl.getEntries)
router.get('/number', auth, entryCtrl.getEntriesNumber)
router.put('/entries/:id', auth, entryCtrl.updateEntry)
router.delete('/entries/:id', auth, entryCtrl.deleteEntry)
router.post('/entries/', auth, entryCtrl.createEntry)

module.exports = router