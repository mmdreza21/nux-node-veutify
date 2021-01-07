const express = require('express')
const router = express.Router()


const cart_controler = require('../controllers/cartcontroler')
const auth = require('../middlewares/auth')

////! cart

router.post('/:prodId', auth, cart_controler.postCart)
router.get('/get', auth, cart_controler.getCart)
router.delete('/:prodId', auth, cart_controler.deletcart)


module.exports = router