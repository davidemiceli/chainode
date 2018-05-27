/*
  APIs call mapping
*/

// Requirements
const Routes = require('../app/routes');

// APIs calls
const APIs = {};

APIs[Routes.MAIN] = 'GET';
APIs[Routes.AUTH.SIGNIN] = 'POST';
APIs[Routes.AUTH.LOGOUT] = 'POST';
APIs[Routes.PEER.INDEX] = 'GET';
APIs[Routes.PEER.BLOCKGENERATOR] = 'GET';
APIs[Routes.PEER.NEW] = 'POST';
APIs[Routes.PERMISSION.JOINED] = 'GET';
APIs[Routes.PERMISSION.JOIN.ASK] = 'POST';
APIs[Routes.PERMISSION.JOIN.APPROVE] = 'POST';
APIs[Routes.PEER.LIST.JOINED] = 'GET';
APIs[Routes.PEER.LIST.PENDING] = 'GET';
APIs[Routes.TRANSACTION.PROPOSE] = 'POST';
APIs[Routes.BLOCKS.LATEST] = 'POST';

module.exports = APIs;
