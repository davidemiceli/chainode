'use strict';

// Requirements
const crypto = require('crypto');

function randomString(strlength) {
  const randlength = (strlength === 32) ? 16 : 8;
  return crypto.randomBytes(randlength).toString('hex');
}

const aes = {};
const algorithm = 'aes-256-cbc';

aes.generateKey = function() {
  return randomString(32);
}

aes.generateIV = function() {
  return randomString(16);
}

aes.decrypt = function(cryptkey, iv, encryptdata) {
  const encryptmsg = new Buffer(encryptdata, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv(algorithm, cryptkey, iv);
  let decoded = decipher.update(encryptmsg, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
}

aes.encrypt = function(cryptkey, iv, cleardata) {
  const encipher = crypto.createCipheriv(algorithm, cryptkey, iv);
  let encryptdata = encipher.update(cleardata, 'utf8', 'binary');
  encryptdata += encipher.final('binary');
  const encode_encryptdata = new Buffer(encryptdata, 'binary').toString('base64');
  return encode_encryptdata;
}

module.exports = aes;
