const { Cat, validate } = require('../models/categorys')
const _ = require('lodash');


exports.post = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    const cat = await new Cat(_.pick(req.body, ["name"]),)

    await cat.save()
    res.send(cat)
}


exports.get = async (req, res) => {
    const cat = await Cat.find()
    res.send(cat)
}