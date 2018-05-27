'use strict';

/*
  Encrypt data and create the signature to verify the peer
*/

// Requirements
const moment = require('moment');
const CRYPT = require('./crypt');

module.exports = function(peer, msg, target_public_key) {
  // Get private key
  const private_key = peer.private;
  // Sign the message
  const sign = CRYPT.sign(private_key, msg);
  // Encrypt the message
  const encrypted_msg = CRYPT.encrypt(target_public_key, msg);
  // Create data for the sign verification
  return {
    peer_id: peer.id,
    data: encrypted_msg,
    sign: sign
  };
};
