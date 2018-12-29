'use strict';
/*
  Server Initialization
*/

// Requirements
const figlet = require('figlet');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const configs = require('./configs/configs');
const Utils = require('./lib/utils');
const Routes = require('./routes');
const ErrorHandler = require('./lib/error-handler');
const Blockchain = require('./blockchain');

// Log types
const logtypes = {
  'DEBUG': {skip: ((req, res) => false)},
  'DEBUG_NO_SYNC': {skip: ((req, res) =>
    new RegExp(`(${Routes.BLOCKS.SYNC}|${Routes.BLOCKS.LATEST})$`).test(req.originalUrl) && res.statusCode === 200
  )},
  'ERRORS': {skip: ((req, res) => res.statusCode === 200)},
  'DISABLED': {skip: ((req, res) => true)}
};

// Init express app
const app = express();

// App settings and plugins
app.use(logger('dev', logtypes[configs.logs.type]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(function(req, res, next) {
  res.ErrorHandler = new ErrorHandler(res);
  return next();
});

// Add router
app.use('/', require('./router'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Error handler
app.use(function(err, req, res, next) {
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

// Start server
app.listen(configs.port, function() {
  return figlet('Chainode', function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    console.log(`Peer server listening on port ${configs.port}`);
    return;
  });
});
