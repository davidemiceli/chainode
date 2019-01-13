'use strict';
/*
  Router
*/

// Requirements
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const Routes = require('./routes');

// Middlewares
// const isAuth = require('./middlewares/isAuth');


module.exports = baseurl => {
  // Bind host and port index html for FE
  const indexHtml = fs
    .readFileSync(path.resolve(__dirname, '../frontend/build/index.html'))
    .toString()
    .replace(/EMBEDDED_BASEURL/, baseurl);
  
  // Pages and redirect
  router.get([Routes.MAIN, `${Routes.DASHBOARD}/`, `${Routes.DASHBOARD}/*`], (req, res) => {
    // Render index dashboard page
    return res.end(indexHtml);
  });

  // Monitoring peer server
  router.get(Routes.APIS, require('./routes/status/health'));
  router.get(Routes.STATUS.HEALTH, require('./routes/status/health'));
  router.get(Routes.STATUS.STATS, require('./routes/status/stats'));
  // Client authentication
  // ...
  // Block management
  router.post(Routes.BLOCK.PROPOSE, require('./routes/block/propose'));
  router.post(Routes.BLOCK.LIST, require('./routes/block/list'));

  // Exporting endpoints
  return router;
}
