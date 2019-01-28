'use strict';
/*
  Test server
*/

// Requirements
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Parameters
const PORT = process.env.PORT || 80;

// Init express app
const app = express();

// App settings and plugins
app.use(logger('dev', {skip: ((req, res) => false)}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use('/', express.static('../../docs'));

// Inject root directory
app.use(function(req, res, next) {
  req.rootdirectory = String(__dirname);
  return next();
});

// Pages and redirect
app.get('/*', (req, res) => res.sendFile('../../docs/index.html', {root: req.rootdirectory}));

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
