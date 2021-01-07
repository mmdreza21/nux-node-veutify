const { Product } = require('../models/products')



exports.postCart = async (req, res) => {
    const prodId = req.params.prodId
    try {
        const product = await Product.findById(prodId)
        req.user.addCart(product)
        res.status(201).send(product)
    } catch (e) {
        console.log(e)
    }
}

exports.getCart = async (req, res) => {
    const user = await req.user.populate("cart.items.productId").execPopulate()
    const cartItem = user.cart.items
    const price = user.cart.totalPrice
    res.send({ product: cartItem, price: price })
}


exports.deletcart = async (req, res) => {
    await req.user.removeCart(req.params.prodId)
    // const product = await Product.findById(req.params.prodId)
    res.status(204).send()
}