const mongoose = require('mongoose');

const orderschema = new mongoose.Schema({
    products: [
        {
            produc: { type: Object, required: true },
            Qty: { type: Number, required: true },
            TPrice: { type: Number, required: true }
        }
    ],
    user: {
        name: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
    },
    totalPrice: Number
})

const Order = mongoose.model("order", orderschema)

exports.Order = Order