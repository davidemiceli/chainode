'use strict';
/*
  Router
*/

// Requirements
const express = require('express');
const router = express.Router();
const Routes = require('./routes');

// Middlewares
const whoiam = require('./middlewares/whoiam');
const peer_required = require('./middlewares/peer_required');
const join_required = require('./middlewares/join_required');
const is_blockgenerator = require('./middlewares/is_blockgenerator');
const sign = require('./middlewares/sign');
const is_auth = require('./middlewares/is_auth');

// Monitoring peer server
router.get(Routes.MAIN, require('./routes/status/health'));
// Client authentication
router.post(Routes.AUTH.SIGNIN, require('./routes/auth/signin'));
router.get(Routes.AUTH.LOGOUT, is_auth, require('./routes/auth/logout'));
// Peer management
router.get(Routes.PEER.INDEX, whoiam, peer_required, require('./routes/peer/index'));
router.get(Routes.PEER.BLOCKGENERATOR, whoiam, peer_required, join_required, require('./routes/permission/joined'));
router.post(Routes.PEER.NEW, is_auth, require('./routes/peer/new'));
// Permission management
router.get(Routes.PERMISSION.JOINED, is_auth, whoiam, peer_required, join_required, require('./routes/permission/joined'));
router.post(Routes.PERMISSION.JOIN.ASK, is_auth, whoiam, peer_required, require('./routes/permission/join/ask'));
router.post(Routes.PERMISSION.JOIN.RECEIVE, whoiam, peer_required, is_blockgenerator, require('./routes/permission/join/receive'));
router.post(Routes.PERMISSION.JOIN.APPROVE, is_auth, whoiam, peer_required, is_blockgenerator, require('./routes/permission/join/approve'));
router.get(Routes.PEER.LIST.JOINED, is_auth, whoiam, peer_required, is_blockgenerator, require('./routes/peer/list/joined'));
router.get(Routes.PEER.LIST.PENDING, is_auth, whoiam, peer_required, is_blockgenerator, require('./routes/peer/list/pending'));
// Transactions
router.post(Routes.TRANSACTION.PROPOSE, is_auth, whoiam, peer_required, join_required, sign.add, require('./routes/transaction/propose'));
router.post(Routes.TRANSACTION.RECEIVE, whoiam, peer_required, is_blockgenerator, sign.verify, require('./routes/transaction/receive'));
// Blocks methods
router.get(Routes.BLOCKS.SYNC, whoiam, peer_required, join_required, require('./routes/blocks/sync'));
router.get(Routes.BLOCKS.LATEST, is_auth, whoiam, peer_required, require('./routes/blocks/latest'));
router.post(Routes.BLOCKS.LATEST, whoiam, peer_required, is_blockgenerator, require('./routes/blocks/latest'));

// Exporting endpoints
module.exports = router;
