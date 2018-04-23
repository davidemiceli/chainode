'use strict';

// Requirements
const Utils = require('../lib/utils');
const redis_client = require('../models/redis');

module.exports = function(req, res, next) {
  // Get peer from db
  return redis_client.getAsync("blockgenerator")
  .then(function(peerdata) {
    req.blockgenerator = peerdata ? JSON.parse(peerdata) : undefined;
    if (req.blockgenerator) {
      return next();
    } else {
      return res.ErrorHandler.InternalServerError('The peer must be subscribed to a Block Generator.');
    }
  })
  .catch(function(err) {
    console.log(err);
    req.blockgenerator = null;
    return res.ErrorHandler.InternalServerError('Internal database error');
  });
}
