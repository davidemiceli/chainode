'use strict';

// Requirements
const RSA = require('./rsa');
const AES = require('./aes');

module.exports = {
  decrypt: function(privateKey, encryptedKey, iv, message) {
    try {
      // Decrypt key
      const decryptedKey = RSA.decrypt(privateKey, encryptedKey);
      // Decrypt IV
      const decryptedIV = RSA.decrypt(privateKey, iv);
      // Decrypt message with decrypted AES key
      const decrypted = AES.decrypt(decryptedKey, decryptedIV, message);
      return JSON.parse(decrypted);
    } catch(err) {
      console.log(`${this.getId()}: decrypting of message error.`);
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
  }
}
