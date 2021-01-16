const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const transport = require('../utils/email');


exports.GetOne = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("user by givin Id not fund")
    res.send(_.pick(user, ["_id", "name", "lname", "phone", "address", "email", "isAdmin", "cart"]))
}

exports.post = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("this user allredy regesterd!")

    user = await new User(_.pick(req.body, [
        "name",
        "lname",
        "email",
        "password",
        "isAdmin",
        "cart",
        "phone",
        "address"

    ]))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const buffer = await crypto.randomBytes(2)
    const cod = buffer.toString('hex')

    transport.sendMail({
        to: req.body.email,
        from: "mrezaj11@live.com",
        subject: "you signup susessfuly",
        html: `
        <div dir="rtl">
        <h1> شما با موفقیت ثبت نام کردید! </h1>
        <p> از این که سایت ما را انتخاب کردید متشکریم. </p>
        <p> کد شما: ${cod} </p>
        </div>
        `
    })

    const token = user.getAuth()
    await user.save()
    res.header("x_auth", token).send(_.pick(user, ["_id", "name", "lname", "email", "isAdmin", "phone", "address", "cart"]))
}

exports.etiteUser = async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.params.id, {
        ..._.pick(req.body, [
            "name",
            "lname",
            "phone",
            "address"

        ])
    }, { new: true })



    const token = user.getAuth()

    res.header("x_auth", token).send(_.pick(user, ["_id", "name", "lname", "email", "phone", "address", "isAdmin", "cart"]))
}


exports.deletUser = async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    res.send(_.pick(user, ["_id", "name", "lname", "cart"]))
}