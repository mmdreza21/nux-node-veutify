const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    transports: [
        new transports.Console({
            level: "error",
            level: "info",
            format: format.combine(format.timestamp(), format.simple(), format.colorize()),
            handleExceptions: true,
        })
    ]
})

exports.logger = logger