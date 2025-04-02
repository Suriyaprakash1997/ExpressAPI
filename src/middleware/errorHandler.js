const logger=require('../config/logger')
const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    url: req.url,
    method: req.method
  });
  
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error'
    });
  };
  
  module.exports = errorHandler;
  