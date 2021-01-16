const express = require('express')
const router = express.Router()


const auth_controler = require('../controllers/authcontriler')
const auth = require('../middlewares/auth')

router.post('/login', auth_controler.authenticate)

router.post('/resetpass', auth_controler.resetpass)

router.get('/newPass/:token', auth_controler.getvalidtoken)

router.put('/newPass/:token', auth_controler.putpassword)



router.get('/user', [auth], auth_controler.login)


module.exports = router