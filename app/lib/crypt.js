'use strict';

// Requirements
const crypto = require('crypto');
const RSA = require('./rsa');
const AES = require('./aes');

module.exports = {
  md5: function(to_hash) {
    return crypto.createHash('sha256').update(to_hash).digest('hex');
  },
  decrypt: function(privateKey, data) {
    try {
      // Get decryption items
      const encryptedKey = data.key;
      const iv = data.iv;
      const message = data.msg;
      // Decrypt key
      const decryptedKey = RSA.decrypt(privateKey, encryptedKey);
      // Decrypt IV
      const decryptedIV = RSA.decrypt(privateKey, iv);
      // Decrypt message with decrypted AES key
      const decrypted = AES.decrypt(decryptedKey, decryptedIV, message);
      return decrypted;
      // return JSON.parse(decrypted);
    } catch(err) {
      console.log(`Error during message decryption.`);
      return false;
    }
  },
  encrypt: function(pubKey, message) {
    // Generate an AES key and IV
    const aesKey = AES.generateKey();
    const iv = AES.generateIV();
    // Encrypt message with AES key
    const encryptedMSG = AES.encrypt(aesKey, iv, JSON.stringify(message));
    // Encrypt AES key with RSA Public Key
    const encryptedKey = RSA.encrypt(pubKey, aesKey);
    // Encrypt AES IV with RSA Public Key
    const encryptedIV = RSA.encrypt(pubKey, iv);
    return {
      key: encryptedKey,
      iv: encryptedIV,
      msg: encryptedMSG
    };
  },
  sign: function(privateKey, message) {
    const signer = crypto.createSign('sha256');
    signer.update(
      JSON.stringify(message)
    );
    return signer.sign(privateKey, 'base64');
  },
  verify: function(publicKey, sign, message) {
    const verifier = crypto.createVerify('sha256');
    verifier.update(message);
    return verifier.verify(publicKey, sign, 'base64');
  }
}
