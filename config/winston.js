var winston = require("winston");

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
  level: 'debug',
  exitOnError: false, // do not exit on handled exceptions
  silent:false, // If true, all logs are suppressed 
  format:winston.format.simple(),
  transports: [new winston.transports.Console()]
});

logger.stream = {
  //combine to morgan
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
