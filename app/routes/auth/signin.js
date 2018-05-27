'use strict';

// Requirements
const jwt = require('jsonwebtoken');
const moment = require('moment');
const configs = require('../../configs/configs');

module.exports = function(req, res, next) {
  // Get api key and api secret
  const api_key = (req.body && req.body.key) || null;
  const api_secret = (req.body && req.body.secret) || null;
  // Check if api key and api secret are correct
  if (api_key !== configs.api.key || api_secret !== configs.api.secret) {
    return res.ErrorHandler.Unauthorized('Wrong authentication parameters');
  }
  // Create JWT Token
  const to_encode = {
    api_key: api_key,
    api_secret: api_secret,
    randomkey: Math.random(),
    now: Date.now()
  };
  // Generate access token
  const token = jwt.sign(to_encode, configs.jwt.secret, {
    algorithm: 'HS256',
    expiresIn: configs.jwt.expire
  });
  return res.json({token: token});
};
