const express = require('express')
const router = express.Router()
const cat = require('../controllers/catCntroler')


router.post('/', cat.post)
router.get('/', cat.get)

module.exports = router