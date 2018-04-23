'use strict';

// Requirements
const CRYPT = require('../../lib/crypt');
const InMemory = require('../../models/inmemory/db');
const PeersModel = require('../../models/mongodb/methods/peers');

module.exports = async function(req, res, next) {
  // Get peer and transaction infos
  const peer_id = req.body && req.body.peer_id;
  const data = req.body && req.body.data;
  if (!peer_id) return res.ErrorHandler.InternalServerError('Missing peer_id.');
  if (!data) return res.ErrorHandler.InternalServerError('Missing data.');
  try {
    // Add proposed block to queque
    const added = InMemory.AddToQueque(data);
    console.log(`Peer ${peer_id} proposed a new transaction.`);
    return res.json(true);
  } catch(e) {
    console.log(e);
    return res.ErrorHandler.InternalServerError('An error occurred during transaction handling.');
  }
}
