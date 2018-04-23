'use strict';

// Requirements
const uuidv4 = require('uuid/v4');
const RSA = require('./rsa');

// Util functions
class Utils {

  constructor() { }

  // Encrypt a message using a public key
  encrypt(public_key, message) {
    return RSA.encrypt(public_key, message);
  }

  // Decrypt a message using a private key
  decrypt(private_key, message) {
    return RSA.decrypt(private_key, message);
  }

  generate_peer(peertype, url) {
    const peer_keys = RSA.generate_keys();
    const peer_id = uuidv4();
    const peer = {
      id: peer_id,
      blockgenerator: (peertype === 'blockgenerator') ? true : undefined,
      url: url,
      public: peer_keys.public,
      private: peer_keys.private
    };
    return peer;
  }

}

module.exports = new Utils();
