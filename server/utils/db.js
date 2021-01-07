const mongoose = require("mongoose");
const { logger } = require("./logger");


module.exports = () => {

    mongoose.connect(process.env.MONGO_CONECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() => {
        logger.info('<<<connected to  Mongo DB success >>>')
    })
}