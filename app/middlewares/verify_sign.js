'use strict';

/*
  Verify the peer using the sended signature
*/

// Requirements
const CRYPT = require('../lib/crypt');
const services = require('../services/services');
const PeersModel = require('../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  // Get signature data
  const signature = req.body.signature || {};
  const peer_id = signature.peer_id;
  const msg = signature.msg;
  const sign = signature.sign;
  if (!msg || !sign) {
    return res.ErrorHandler.Unauthorized('Missing peer signature.');
  }
  try {
    let peer = {};
    if (req.newpeer) {
      // Check if url and peer data sended are correct
      const peer_url = (req.body && req.body.url) || null;
      const resp = await services.CallToOne('GET', peer_url, 'peer');
      peer = resp.data;
    } else {
      // Get peer data
      const peeritem = await PeersModel.GetPeer({id: peer_id});
      peer = peeritem && peeritem[0];
    }
    // Get public key of the peer
    const public_key = peer.public;
    // Check the peer request is authentic
    const verified = CRYPT.verify(public_key, sign, msg);
    if (verified) {
      return next();
    }
    return res.ErrorHandler.Unauthorized('Not valid peer proof signature.');
  } catch(e) {
    return res.ErrorHandler.InternalServerError('Not valid peer.');
  }
}
