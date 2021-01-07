const express = require('express')
const router = express.Router()

const product_controler = require('../controllers/prodscontroler')
const cart_controler = require('../controllers/cartcontroler')


router.get('/', product_controler.getall)
router.get('/:id', product_controler.getOne)
router.get('/:cat', product_controler.getBycat)
router.get('/tag/:tag', product_controler.getBytag)





module.exports = router