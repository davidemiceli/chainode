'use strict';
/*
  Handle express errors using a generic inherited logger
*/

// https://stackoverflow.com/questions/46367401/how-to-to-create-a-custom-logger-in-express
// GENERAL winston example => https://gist.github.com/rtgibbons/7354879
// USE THIS (winston) => https://gist.github.com/vikas5914/cf568748ac89446e19ecd5e2e6900443

// Select logger by response status code
const selectLogger = (res, logger) => (res.statusCode < 400 || res.statusCode >= 500) ? logger.error : logger.info;


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
