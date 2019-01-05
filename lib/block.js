'use strict';
/*
  Block methods
*/

// Requirements
const uuid4 = require('uuid/v4');
const CRYPT = require('./crypt');
const { utcTimestamp } = require('./helpers');

// Calculate hash of a block
const calculateHash = (event_id, organization, generated_time, data) => {
  const toHash = `${event_id}|${organization}|${generated_time}|${data}`;
  return CRYPT.md5(toHash).toString();
}

// Convert to block object
const toBlock = b => block(b.hash, b.event_id, b.organization, b.generated_time, b.data);

// Block object
const block = (hash, event_id, organization, generated_time, data) => ({
  hash: hash,
  event_id: event_id,
  organization: organization,
  generated_time: generated_time,
  data: data
});

// Generate a block
const generateNextBlock = (organization, data) => {
  const event_id = uuid4()
  const generated_time = utcTimestamp();
  const hash = calculateHash(event_id, organization, generated_time, data);
  return block(hash, event_id, organization, generated_time, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = b => calculateHash(b.event_id, b.organization, b.generated_time, b.data);

// Check if a block is valid
const isValidBlock = (logger, block) => {
  const oneBlockHash = calculateHashFromBlock(block);
  if (oneBlockHash !== block.hash) {
    logger.error(`Found invalid hash ${block.hash} compared to ${oneBlockHash}.`);
    return false;
  }
  return true;
}


// Export block methods
module.exports = {
  toBlock,
  generateNextBlock,
  isValidBlock
};
