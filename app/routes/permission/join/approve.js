'use strict';

// Requirements
const PeersModel = require('../../../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  // Get the info about the peer asking to join
  const peer_url = (req.body && req.body.url) || null;
  if (!peer_url) {
    return res.ErrorHandler.InternalServerError('Missing url parameter.');
  }
  // Update peer infos as allowed peer
  try {
    const added = await PeersModel.AddToPeers({url: peer_url});
    return res.json(true);
  } catch(e) {
    console.log(e);
    return res.ErrorHandler.InternalServerError();
  }
}
