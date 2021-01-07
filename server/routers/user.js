
const express = require('express')
const router = express.Router()

const user_controler = require('../controllers/usercontroler')

router.post('/', user_controler.post)
router.get('/:id', user_controler.GetOne)
router.put('/:id', user_controler.etiteUser)
router.delete('/:id', user_controler.deletUser)



module.exports = router