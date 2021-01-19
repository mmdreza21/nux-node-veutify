const express = require('express')
const cors = require('cors');

const user = require('../routers/user');
const auth = require('../routers/auth');
const admin = require('../routers/admin');
const cat = require('../routers/cat');
const prods = require('../routers/product');
const cart = require('../routers/cart');
const order = require('../routers/order');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path')

const fileStorage = multer.diskStorage({
    destination: (req, fill, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname)
    }
})

const filters = (req, file, cb) => {
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
    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(multer({ storage: fileStorage, fileFilter: filters }).single('imgurl'))
    app.use('/images', express.static(path.join("images")))
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/adminP', admin)
    app.use('/api/cat', cat)
    app.use('/api/prods', prods)
    app.use('/api/cart', cart)
    app.use('/api/order', order)
}

