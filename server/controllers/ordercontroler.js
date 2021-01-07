
const { Order } = require('../models/order')


exports.getorders = async (req, res) => {
    const order = await Order.find({ "user.userId": req.user._id })
    res.send(order)
}


exports.postOrder = async (req, res) => {

    const user = await req.user.populate("cart.items.prouctId").execPopulate()
    const prods = await user.cart.items.map(i => {
        return { product: { ...i.productId._doc }, Qty: i.Qty, TPrice: i.TPrice }
    })



    const order = await new Order({
        products: prods,
        user: {
            name: req.user.name,
            userId: req.user._id,
        },
        totalPrice: req.user.cart.totalPrice
    })

    await order.save()
    await req.user.clearCart()

    res.send(order)
} 