const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')


const transport = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: "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"
    }
}))


module.exports = transport