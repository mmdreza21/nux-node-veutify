const logger = require('../utils/logger')

module.exports = async (req, res, next) => {
    try {
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)

        let startIndex = (page - 1) * limit
        let endIndex = limit * page

        let result = {}
        result.lent = parseInt(await model.countDocuments().exec() / limit + 1)
        if (startIndex)
            if (endIndex < await model.countDocuments().exec() / limit + 1) {
                result.next = {
                    page: page + 1,
                    limit
                }
            }
        if (startIndex > 0) {
            result.previos = {
                page: page - 1
                , limit
            }
        }

        result.data = await model.find().limit(limit).skip(startIndex).exec()
        res.paginationresult = result
        next()

    } catch (e) {
        logger.error(e)
    }
}