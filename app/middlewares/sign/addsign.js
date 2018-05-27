'use strict';

/*
  Create the signature to verify the peer
*/

// Requirements
const sign = require('../../lib/sign');

module.exports = function(req, res, next) {
  const blockgenerator = req.blockgenerator;
  // Item to propose
  const data = req.body.data;
  if (!data) {
    return res.ErrorHandler.InternalServerError('Missing data.');
  }
  const encrypted_data = sign(req.current_peer, data, blockgenerator.public);
  // Generate signature
  req.encrypted_data = encrypted_data;
  return next();
}
