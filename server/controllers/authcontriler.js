const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require('bcrypt')

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


function validator(user) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string()
    })
    return schema.validate(user)
}