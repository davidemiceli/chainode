'use strict';

// Requirements
const Utils = require('../lib/utils');
const redis_client = require('../models/redis');

module.exports = function(req, res, next) {
  // Check if the peer was already created
  if (req.current_peer.blockgenerator) return next();
  return res.ErrorHandler.Unauthorized('Only Block Generator can do this action.');
}
