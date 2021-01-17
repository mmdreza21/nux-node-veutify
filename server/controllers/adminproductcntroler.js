const { Product, validate } = require('../models/products');
const _ = require('lodash')

exports.post = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const image = req.file
    console.log(req.file);
    if (!image) res.status(400).send('file in not find')


    const product = await new Product(
        {
            ..._.pick(req.body, [
                "title",
                "about",
                "price",
                "userId",
                "category",
                "numInStock",
                "tag",
                "userId"
            ]),
            imgurl: image.path
        }
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

    const image = req.file

    const product = await Product.findByIdAndUpdate(req.params.id, {
        ..._.pick(req.body, [
            "title",
            "about",
            "price",
            "category",
            "numInStock",
            "tag",
            "userId"
        ]),
        imgurl: image.path

    }, { new: true })
    res.send(product)
}

exports.deleteProds = async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) return res.status(404).send('in valid ID for delete')

    res.send(product)
}