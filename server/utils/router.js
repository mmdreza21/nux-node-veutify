const express = require('express')
const cors = require('cors');

const user = require('../routers/user');
const auth = require('../routers/auth');
const admin = require('../routers/admin');
const cat = require('../routers/cat');
const prods = require('../routers/product');
const cart = require('../routers/cart');
const order = require('../routers/order');


module.exports = (app) => {
    app.use(express.json())
    app.use(cors())
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/adminP', admin)
    app.use('/api/cat', cat)
    app.use('/api/prods', prods)
    app.use('/api/cart', cart)
    app.use('/api/order', order)
}

