const express = require('express')
const router = express.Router()


const auth_controler = require('../controllers/authcontriler')
const auth = require('../middlewares/auth')

router.post('/login', auth_controler.authenticate)

router.get('/user', [auth], auth_controler.login)


module.exports = router