
const { Order } = require('../models/order')
const path = require('path')
const PDFkit = require('pdfkit')
const fs = require('fs')
exports.getorders = async (req, res) => {
    const order = await Order.find({ "user.userId": req.user._id })
    res.send(order)
}


exports.postOrder = async (req, res) => {

    const user = await req.user.populate("cart.items.productId").execPopulate()
    const prods = await user.cart.items.map(i => {
        return { Qty: i.Qty, produc: { ...i.productId._doc }, TPrice: i.TPrice }
    })
    const order = await new Order({
        products: prods,
        user: {
            name: req.user.name,
            userId: req.user._id,
        },
        totalPrice: req.user.cart.totalPrice
    })

    // console.log(order)
    await order.save()
    await req.user.clearCart()

    res.send(order)
}

exports.invoice = async (req, res) => {
    const orderId = req.params.id
    const order = await Order.findById(orderId)
    if (!order) return res.status(404).send("order notfound")
    if (order.user.userId.toString() !== req.user._id.toString()) return res.status(401).send("un Authruretion")

    const invoicename = `invoice of ${order.user.name}.pdf`
    const invoicePath = path.join("data", 'invice', invoicename)

    const pdfdoc = new PDFkit()
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", 'inline;filename="' + invoicename + '"')
    res.setHeader('Access-Control-Allow-Origin', '*');
    pdfdoc.pipe(fs.createWriteStream(invoicePath))
    pdfdoc.pipe(res)
    pdfdoc.fontSize(24).text('invice')
    pdfdoc.fontSize(8).text('<<---------------->>')

    order.products.forEach(p => {
        pdfdoc.fontSize(12).text(`name: ${p.produc.title}____ quantity:(${p.Qty})___ price:{{${p.TPrice}}}  `)
        pdfdoc.fontSize(8).text("<<----->>")
    });
    pdfdoc.fontSize(15).text(`Total Price:${order.totalPrice}`)
    pdfdoc.fontSize(8).text("<<--------->>")
    pdfdoc.fontSize(8).text(`tanks for bying from us!`)
    pdfdoc.end()

}