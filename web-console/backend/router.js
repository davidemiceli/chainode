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
    return res.send(indexHtml);
  });

  // Monitoring peer server
  router.get(Routes.MAIN, require('./routes/status/health'));
  // Client authentication
  // ...
  // Peer management
  router.post(Routes.BLOCK.PROPOSE, require('./routes/block/propose'));
  router.post(Routes.BLOCK.LIST, require('./routes/block/list'));
  // Peer management
  // router.post(Routes.PEER.NEW, require('./routes/peer/new'));
  // router.post(Routes.PEER.AUTH, require('./routes/peer/auth'));

  // Exporting endpoints
  return router;
}
