const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const logger = require('../utils/logger')

module.exports = async (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token provided!!")

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_P)
        // req.user = decoded
        const user = await User.findById(decoded._id).select("-password -email")
        req.user = user
        next()
    } catch (e) {
        res.status(401).send('in valid tokem >> "WTF"')
    }

}