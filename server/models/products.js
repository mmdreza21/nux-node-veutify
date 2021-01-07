const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        minLength: 3
    },
    price: {
        type: Number,
        required: true,
    },
    imgurl: {
        type: Array,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.ObjectId, ref: "user", required: true
    },
    category: {
        type: Schema.ObjectId, ref: "category", required: true
    },
    numInStock: { type: Number, required: true, default: 1 },
    numOfSell: { type: Number, default: 0 },
    tag: { type: Array, }

})
productsSchema.methods.sell = function (sel) {


    let newnumInstok = this.numInStock - 1
    let newnumofsell = this.numOfSell + 1

    this.numInStock = newnumInstok
    this.numOfSell = newnumofsell

    this.save()

}

const Product = mongoose.model("product", productsSchema)

function validatore(prod) {
    const schema = Joi.object({
        __v: Joi.number(),
        _id: Joi.string(),
        title: Joi.string().required().max(50).min(3),
        about: Joi.string().required().max(50).min(3),
        price: Joi.number().required(),
        imgurl: Joi.array().required(),
        userId: Joi.objectId().required(),
        category: Joi.objectId().required(),
        numInStock: Joi.number().required(),
        numOfSell: Joi.number(),
        tag: Joi.array().required()
    })
    return schema.validate(prod)
}


exports.validate = validatore
exports.Product = Product