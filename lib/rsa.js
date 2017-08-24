'use strict';

// Requirements
const path = require('path');
const fs = require('fs');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');

const rsa = {};

// Open and closed keys generation method
rsa.generateKeys = function(folder, filename) {
  const key = new NodeRSA();
  // 2048 — key length, 65537 open exponent
  key.generateKeyPair(2048, 65537);
  // save keys as pem line in pkcs8
  fs.writeFileSync(`${folder}/private/${filename}.pem`, key.exportKey('pkcs8-private-pem'));
  fs.writeFileSync(`${folder}/public/${filename}.pem`, key.exportKey('pkcs8-public-pem'));
  return true;
}

// Encrypting RSA, using padding OAEP, with nodejs crypto:
rsa.encrypt = function(publicKey, message) {
  const enc = crypto.publicEncrypt({
    key: publicKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(message));
  return enc.toString('base64');
};

// Descrypting RSA, using padding OAEP, with nodejs crypto:
rsa.decrypt = function(privateKey, message) {
  const enc = crypto.privateDecrypt({
    key: privateKey,
    padding: crypto.RSA_PKCS1_OAEP_PADDING
  }, Buffer.from(message, 'base64'));
  return enc.toString();
  // return enc.toString("utf8");
};

module.exports = rsa;
