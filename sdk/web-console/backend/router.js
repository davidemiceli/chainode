'use strict';
/*
  Router
*/

// Requirements
const path = require('path');
const express = require('express');
const router = express.Router();
const Routes = require('./routes');

// Middlewares
// const isAuth = require('./middlewares/isAuth');

// Pages and redirect
router.get([Routes.MAIN, `${Routes.DASHBOARD}/`, `${Routes.DASHBOARD}/*`], (req, res) => {
  // Render index dashboard page
  return res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
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
module.exports = router;
