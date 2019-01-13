'use strict';
/*
  Web console server Initialization
*/

// Requirements
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ErrorHandler = require('./lib/ErrorHandler');
const logHandler = require('./lib/logHandler');


module.exports = async (configs, sdk, logger, db) => {
  const componentName = 'WebConsole';
  logger.info(`Starting ${componentName}.`);
  const webConsolePort = (configs.port == 80) ? '' : `:${configs.port}`;
  const webConsoleUrl = `http://${configs.host}${webConsolePort}`;
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
    req.sdk = sdk;
    res.ErrorHandler = new ErrorHandler(res);
    return next();
  });

  // Add router
  const router = require('./router')(webConsoleUrl);
  app.use('/', router);

  // Static files
  const staticFolder = path.resolve(__dirname, '../frontend/build');
  app.use('/', express.static(staticFolder));

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
      res.locals.error = current_env === 'development' ? err : {
        message: 'Internal Server Error'
      };
      req.sdk.logger.error(err.stack);
    }
    // render the error
    res.status(err.status || 500);
    return res.json({
      code: err.status,
      message: err.message
    });
  });

  // Start UI console server
  return app.listen(configs.port, async () => {
    logger.info(`${componentName} listening on port ${webConsoleUrl}.`);
    return app;
  });
}
