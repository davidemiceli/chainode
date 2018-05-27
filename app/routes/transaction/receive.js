'use strict';

// Requirements
const InMemory = require('../../models/inmemory/db');

module.exports = async function(req, res, next) {
  // Get peer and transaction infos
  const peer_id = req.received_data && req.received_data.peer_id;
  const data = req.received_data && req.received_data.data;
  if (!peer_id || !data) return res.ErrorHandler.InternalServerError('Issue about data decryption.');
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
