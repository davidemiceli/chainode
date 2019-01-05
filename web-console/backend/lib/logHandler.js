'use strict';
/*
  Handle express errors using a generic inherited logger
*/


// Select logger by response status code
const selectLogger = (res, logger) => {
  if (res.statusCode >= 200 && res.statusCode < 300) return logger.info;
  if (res.statusCode >= 300 && res.statusCode < 400) return logger.warn;
  return logger.error;
}


module.exports = (componentName, logger) => (req, res, next) => {
  const startTime = Date.now();
  if (res.headersSent) {
    const log = selectLogger(res, logger);
    log(componentName, req.method, req.url, res.statusCode);
  } else {
    res.on('finish', function() {
      const endTime = Date.now();
      const duration = endTime-startTime;
      const log = selectLogger(res, logger);
      log(componentName, req.method, req.url, res.statusCode, '-', duration, 'ms');
    })
  }
  return next();
};
