const Joi = require("joi");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const jwt = require('jsonwebtoken')
const Fawn = require('fawn');
const { Product } = require("./products");
Fawn.init(mongoose)


const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3
    },
    lname: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 3
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: Boolean,

    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
            Qty: { type: Number, required: true },
            TPrice: Number
        }],
        totalPrice: { type: Number, default: 0 }
    }
})

userSchema.methods.getAuth = function () {
    const token = jwt.sign({ name: this.name + this.lname, _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_P)
    return token
}

userSchema.methods.addCart = async function (product) {
    const cartsProduductIndex = this.cart.items.findIndex(prods => {
        return prods.productId.toString() === product._id.toString()
    })


    let Total = product.price
    let price = this.cart.totalPrice + Total


    // console.log(cartsProduductIndex);


    let newQty = 1
    let updatedCartItems = [...this.cart.items]
    let newTPrice = product.price

    if (cartsProduductIndex >= 0) {
        newQty = this.cart.items[cartsProduductIndex].Qty + 1
        updatedCartItems[cartsProduductIndex].Qty = newQty
        newTPrice = this.cart.items[cartsProduductIndex].TPrice + product.price
        updatedCartItems[cartsProduductIndex].TPrice = newTPrice
    } else {
        updatedCartItems.push({
            productId: product._id,
            Qty: newQty,
            TPrice: newTPrice
        })
    }
    const updatedCart = {
        items: updatedCartItems,
        totalPrice: price
    }

    this.cart = updatedCart

    await this.save()
    await new Fawn.Task()
        .update('products', { _id: product._id }, {
            $inc: { numInStock: - 1, numOfSell: + 1 }

        }).run()
}

userSchema.methods.removeCart = async function (prodId) {
    const cartsItems = this.cart.items.filter(p => {
        return p.productId.toString() !== prodId.toString()
    })

    const cartIndex = this.cart.items.findIndex(c => {
        return c.productId.toString() === prodId.toString()
    })
    let updatedCartItems = [...this.cart.items]


    const Price = this.cart.totalPrice - this.cart.items[cartIndex].TPrice


    this.cart.items = cartsItems
    this.cart.totalPrice = Price
    const product = await Product.findById(prodId)
    const qty = updatedCartItems[cartIndex].Qty
    await Product.findByIdAndUpdate(prodId, {
        numInStock: product.numInStock + qty,
        numOfSell: product.numOfSell - qty
    }, { new: true })
    await this.save()

}
userSchema.methods.clearCart = function () {
    this.cart = { items: [], totalPrice: 0 }
    return this.save()
}

const User = mongoose.model('User', userSchema)

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};
function validatore(user) {
    const schema = Joi.object({
        __v: Joi.number(),
        _id: Joi.string(),
        name: Joi.string().required().max(50).min(3),
        lname: Joi.string().required().max(50).min(3),
        email: Joi.string().email(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        password: passwordComplexity(complexityOptions),
        cart: Joi.object(),
        isAdmin: Joi.boolean(),
    })
    return schema.validate(user)
}

exports.validate = validatore
exports.User = User