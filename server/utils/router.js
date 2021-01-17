const express = require('express')
const cors = require('cors');
const path = require('path')

const user = require('../routers/user');
const auth = require('../routers/auth');
const admin = require('../routers/admin');
const cat = require('../routers/cat');
const prods = require('../routers/product');
const cart = require('../routers/cart');
const order = require('../routers/order');
const multer = require('multer');

const fileStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        cb(null, `/${new Date.now().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const filter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)

    }
}
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
    app.use("/image", express.static(path.join(__dirname, 'images')))
    app.use(multer({ Storage: fileStore, fileFilter: filter }).single('imgurl'))
}

