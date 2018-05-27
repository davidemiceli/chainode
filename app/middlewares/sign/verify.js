'use strict';

/*
  Verify the peer using the sended signature
*/

// Requirements
const CRYPT = require('../../lib/crypt');
const services = require('../../services/services');
const PeersModel = require('../../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  try {
    // Get signature data
    const peer_id = req.body && req.body.peer_id;
    const data = req.body && req.body.data;
    const sign = req.body && req.body.sign;
    if (!peer_id || !sign || !data) {
      return res.ErrorHandler.Unauthorized('Missing peer signature data.');
    }
    // Get peer data
    const peeritem = await PeersModel.GetPeer({id: peer_id});
    const peer = peeritem && peeritem[0];
    // Get public key of the peer
    const public_key = peer.public;
    // Get private key of the server
    const private_key = req.current_peer.private;
    // Decrypt data
    const decrypted_data = CRYPT.decrypt(private_key, data);
    // Check the peer request is authentic
    const verified = CRYPT.verify(public_key, sign, decrypted_data);
    if (verified) {
      req.received_data = {
        peer_id: peer_id,
        data: decrypted_data
      };
      return next();
    }
    return res.ErrorHandler.Unauthorized('Not valid peer proof signature.');
  } catch(e) {
    return res.ErrorHandler.InternalServerError('Not valid peer.');
  }
}
