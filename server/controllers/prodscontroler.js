const { Product } = require("../models/products")




exports.getall = async (req, res) => {
    const products = await Product.find()
    res.send(products)
}

exports.getOne = async (req, res) => {
    const products = await Product.findById(req.params.id)
    res.send(products)
}

exports.getBycat = async (req, res) => {
    const products = await Product.find({ category: req.params.cat }).populate('category')
    if (!products) return res.status(404).send("NotFound")
    res.send(products)
}


exports.getBytag = async (req, res) => {

    const products = await Product.find({ tag: req.params.tag })
    if (!products) return res.status(404).send("NotFound")
    res.send(products)
}