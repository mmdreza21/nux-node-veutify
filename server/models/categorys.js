const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema

const catSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minLength: 3
    },


})
const Cat = mongoose.model("category", catSchema)

function validatore(prod) {
    const schema = Joi.object({
        __v: Joi.number(),
        _id: Joi.string(),
        name: Joi.string().required().max(50).min(3),

    })
    return schema.validate(prod)
}


exports.validate = validatore
exports.Cat = Cat