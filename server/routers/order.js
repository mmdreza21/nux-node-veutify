const express = require('express')
const router = express.Router()


const ordercont = require('../controllers/ordercontroler')
const auth = require('../middlewares/auth')

router.get('/', auth, ordercont.getorders)

router.post("/", auth, ordercont.postOrder)


module.exports = router 