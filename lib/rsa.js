'use strict';

// Requirements
const path = require('path');
const fs = require('fs');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');

const rsa = {};

// Open and closed keys generation method
rsa.generate_keys = function() {
  const key = new NodeRSA();
  // 2048 — key length, 65537 open exponent
  key.generateKeyPair(2048, 65537);
  // create keys as pem line in pkcs8
  return {
    private: key.exportKey('pkcs8-private-pem'),
    public: key.exportKey('pkcs8-public-pem')
  }
}

// Encrypting RSA, using padding OAEP, with nodejs crypto:
rsa.encrypt = function(public_key, message) {
  const enc = crypto.publicEncrypt({
    key: public_key,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(message));
  return enc.toString('base64');
};

// Descrypting RSA, using padding OAEP, with nodejs crypto:
rsa.decrypt = function(private_key, message) {
  const enc = crypto.privateDecrypt({
    key: private_key,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(message, 'base64'));
  return enc.toString();
  // return enc.toString("utf8");
};

module.exports = rsa;
