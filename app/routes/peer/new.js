'use strict';

// Requirements
const Utils = require('../../lib/utils');
const redis_client = require('../../models/redis');

module.exports = function(req, res, next) {
  // Get the info about the peer to create
  const peer_type = (req.body && req.body.type) || null;
  const peer_url = (req.body && req.body.url) || null;
  if (!peer_url) {
    return res.ErrorHandler.InternalServerError('Missing peer url.');
  }
  // Create peer
  const peer = Utils.generate_peer(peer_type, peer_url);
  // Parse its data as json string
  const peerjson = JSON.stringify(peer);
  // Store it on db
  return redis_client.setAsync("peer", peerjson)
  .catch(function(err) {
    console.log(err);
    return res.ErrorHandler.InternalServerError('Internal database error');
  })
  .then(function(obj) {
    return res.json({id: peer.id});
  });
}
