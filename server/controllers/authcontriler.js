const Joi = require("joi");
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const { User } = require("../models/user");
const transport = require('../utils/email');





exports.authenticate = async (req, res) => {
    const { error } = validator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email o password')

    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) return res.status(400).send('Invalid email o password')

    const token = await user.getAuth()
    res.send({ token: token, name: user.name })

}




exports.login = async (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send("unknown")
    }



}

exports.resetpass = async (req, res) => {
    const { error } = emailvalidator(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const email = req.body.email

    const user = await User.findOne({ email: email })
    if (!user) return res.status(400).send('this email has not rejestert yet')

    const buffer = await crypto.randomBytes(32)
    const token = buffer.toString('hex')

    user.resetPasstoken = token
    user.DateOFToken = Date.now() + 3600000
    await user.save()

    transport.sendMail({
        to: email,
        from: "mrezaj11@live.com",
        subject: "reseting password",
        html: `
        <div dir="rtl">
    <h1> شما در حال تغییر کلمه ی عبور خود هستید اگر این از طرف شما نیست کاری نکنید</h1>
<p>کلمه ی عبور خد را از <a href="http://localhost:3000/login/${token}">اینجا</a> تغییر دهید! </p>
</div>
`})

    res.send("succsess")
}

exports.getvalidtoken = async (req, res) => {
    const user = await User.findOne({ resetPasstoken: req.params.token, DateOFToken: { $gt: Date.now() } })
    if (!user) return res.send(false)
    res.send(true)
}

exports.putpassword = async (req, res) => {
    const { error } = validatorpass(req.body)
    if (error) return res.status(400).send(error.details[0].message)


    const password = req.body.password
    const salt = await bcrypt.genSalt(12)
    const codedpass = await bcrypt.hash(password, salt)

    const user = await User.findOneAndUpdate(
        { resetPasstoken: req.params.token },
        { password: codedpass, resetPasstoken: undefined, DateOFToken: undefined },
        { new: true }
    )
    if (!user) return res.status(404).send('the user notfund')

    res.send("success")
}





function validator(user) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
    })
    return schema.validate(user)
}

function emailvalidator(user) {
    const schema = Joi.object({
        email: Joi.string().email(),

    })
    return schema.validate(user)
}
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};
function validatorpass(user) {
    const schema = Joi.object({
        password: passwordComplexity(complexityOptions),
    })
    return schema.validate(user)
}