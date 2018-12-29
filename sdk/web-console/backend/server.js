'use strict';
/*
  Web console server Initialization
*/

// Requirements
const express = require('express');
const bodyParser = require('body-parser');
const ErrorHandler = require('./lib/ErrorHandler');
const logHandler = require('./lib/logHandler');


module.exports = async (configs, broker, logger, db) => {
  const componentName = 'WebConsole';
  // Init express app
  const app = express();
  // App settings and plugins
  // app.use(morgan('dev', logtypes[configs.logs.type]));
  app.use(logHandler(componentName, logger));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    req.db = db;
    req.broker = broker;
    res.ErrorHandler = new ErrorHandler(res);
    return next();
  });

  // Add router
  app.use('/', require('./router'));

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  // Error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    const current_env = req.app.get('env');
    res.locals.message = err.message;
    if (err.status < 400 || err.status >= 500) {
      res.locals.error = current_env === 'dev' ? err : {
        message: 'Internal Server Error'
      };
    }
    // render the error
    res.status(err.status || 500);
    if (err.status != 404) console.log(err.stack);
    return res.json({
      code: err.status,
      message: err.message
    });
  });

  // Start UI console server
  app.listen(configs.port, () => {
    logger.info(`${componentName} listening on port ${configs.port}`);
    return app;
  });
}
