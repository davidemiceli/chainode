'use strict';

// Requirements
const Utils = require('../../../lib/utils');
const PeersModel = require('../../../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  try {
    const peers = await PeersModel.GetPendingPeers();
    return res.json(peers);
  } catch(e) {
    console.log(e);
    return res.ErrorHandler.InternalServerError();
  }
}
