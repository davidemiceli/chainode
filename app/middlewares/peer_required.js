'use strict';

// Requirements
const Utils = require('../lib/utils');
const redis_client = require('../models/redis');

module.exports = function(req, res, next) {
  // Check if the peer was already created
  if (req.current_peer) return next();
  return res.ErrorHandler.Unauthorized('No peer generated. You must create a new peer first.');
}
