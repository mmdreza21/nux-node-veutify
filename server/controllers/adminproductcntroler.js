const { Product, validate } = require('../models/products');
const _ = require('lodash')

exports.post = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const product = await new Product(
        _.pick(req.body, [
            "title",
            "about",
            "price",
            "imgurl",
            "userId",
            "category",
            "numInStock",
            "tag",
            "userId"
        ]),

    )

    await product.save()
    res.send(product)

}

exports.getall = async (req, res) => {

    id = req.params.id
    const products = await Product.find({ "userId": id })
    if (!products) return res.status(404).send("not found")

    res.send(products)

}


exports.editeprods = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const product = await Product.findByIdAndUpdate(req.params.id, {
        ..._.pick(req.body, [
            "title",
            "about",
            "price",
            "imgurl",
            "category",
            "numInStock",
            "tag",
            "userId"
        ]),

    }, { new: true })
    res.send(product)
}

exports.deleteProds = async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) return res.status(404).send('in valid ID for delete')

    res.send(product)
}