'use strict';
/*
  Router
*/

// Requirements
const express = require('express');
const router = express.Router();
const Routes = require('./routes');

// Middlewares
// const isAuth = require('./middlewares/isAuth');

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
