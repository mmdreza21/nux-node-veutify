// const logger = require('../utils/logger ')

module.exports = function (model) {

    return async (req, res, next) => {
        try {
            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)

            let startIndex = (page - 1) * limit
            let endIndex = limit * page

            let result = {}
            result.lent = parseInt(await model.countDocuments().exec() / limit).toFixed()
            if (endIndex < (await model.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit
                }
            }
            if (startIndex > 0) {
                result.previos = {
                    page: page - 1,
                    limit: limit
                }
            }

            result.data = await model.find().limit(limit).skip(startIndex).exec()
            res.paging = result
            next()

        } catch (e) {
            console.log(e)
        }
    }
}

