'use strict';

// Requirements
const Utils = require('../../lib/utils');
const redis_client = require('../../models/redis');

module.exports = function(req, res, next) {
  // If the peer is the Block Generator return itself
  if (req.current_peer.blockgenerator) {
    const blockgenerator = req.current_peer;
    delete blockgenerator.private
    return res.json(blockgenerator);
  }
  // Get peer from db
  return redis_client.getAsync("blockgenerator")
  .then(function(peerdata) {
    const blockgenerator = peerdata ? JSON.parse(peerdata) : undefined;
    return res.json(blockgenerator);
  })
  .catch(function(err) {
    return res.ErrorHandler.InternalServerError('Internal database error');
  });
}
