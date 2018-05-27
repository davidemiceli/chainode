'use strict';

// Requirements
const jwt = require('jsonwebtoken');
const configs = require('../configs/configs');
const Utils = require('../lib/utils');

module.exports = function(req, res, next) {
  // Get token
  const token = (req.headers && req.headers['x-access-token']) || null;
  if (!token) {
    return res.ErrorHandler.Unauthorized('Missing authorization');
  }
  // Try to decode token
  const decoded = jwt.verify(token, configs.jwt.secret, {
    algorithms: ['HS256'],
    maxAge: configs.jwt.expire
  });
  // Check if decoding is correct
  if (!decoded) {
    return res.ErrorHandler.Unauthorized('Invalid authorization');
  }
  // Check if data inside token is valid
  if (!(
    decoded.api_key && (decoded.api_key === configs.api.key) &&
    decoded.api_secret && (decoded.api_secret === configs.api.secret)
  )) {
    return res.ErrorHandler.Unauthorized('Wrong authorization');
  }
  return next();
};
