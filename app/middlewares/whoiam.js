'use strict';

// Requirements
const Utils = require('../lib/utils');
const redis_client = require('../models/redis');

module.exports = function(req, res, next) {
  // Get peer from db
  return redis_client.getAsync("peer")
  .then(function(peerdata) {
    req.current_peer = peerdata ? JSON.parse(peerdata) : undefined;
    return next();
  })
  .catch(function(err) {
    console.log(err);
    req.current_peer = null;
    return res.ErrorHandler.InternalServerError('Internal database error');
  });
}
