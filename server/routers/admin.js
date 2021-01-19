const express = require('express')
const router = express.Router()


const product_controler = require('../controllers/adminproductcntroler')



router.post('/', product_controler.post)
router.get('/:id', product_controler.getall)
router.put('/:id', product_controler.editeprods)
router.delete('/:id', product_controler.deleteProds)

module.exports = router