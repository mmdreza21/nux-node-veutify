const express = require('express')
const router = express.Router()
const cors = require('cors');


const ordercont = require('../controllers/ordercontroler')
const auth = require('../middlewares/auth')

router.get('/', auth, ordercont.getorders)
router.post("/", auth, ordercont.postOrder)

router.get("/invice/:id", [auth, cors()], ordercont.invoice)


module.exports = router 