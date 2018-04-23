'use strict';

/*
  Create the signature to verify the peer
*/

// Requirements
const CRYPT = require('../lib/crypt');

module.exports = function(req, res, next) {
  // Get private key
  const private_key = req.current_peer.private;
  // Data to sign
  const msg = JSON.stringify({
    peer_id: req.current_peer.id,
    peer_url: req.current_peer.url,
    created_at: Date.now(),
    randomkey: Math.random()
  });
  // Sign the message
  const sign = CRYPT.sign(private_key, msg);
  // Create data for the sign verification
  const signature = {
    peer_id: req.current_peer.id,
    msg: msg,
    sign: sign
  };
  req.peer_signature = signature;
  return next();
}
