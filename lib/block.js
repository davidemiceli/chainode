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
const toBlock = b => block(b.id, b.event_id, b.organization, b.generated_time, b.data);

// Block object
const block = (id, event_id, organization, generated_time, data) => ({
  id: id,
  event_id: event_id,
  organization: organization,
  generated_time: generated_time,
  data: data
});

// Generate a block
const generateNextBlock = (organization, data) => {
  const event_id = uuid4()
  const generated_time = utcTimestamp();
  const id = calculateHash(event_id, organization, generated_time, data);
  return block(id, event_id, organization, generated_time, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = b => calculateHash(b.event_id, b.organization, b.generated_time, b.data);

// Check if a block is valid
const isValidBlock = (logger, block) => {
  const oneBlockId = calculateHashFromBlock(block);
  if (oneBlockId !== block.id) {
    logger.error(`Found invalid hash ${block.id} compared to ${oneBlockId}.`);
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
