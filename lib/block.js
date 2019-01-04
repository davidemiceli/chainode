'use strict';
/*
  Block methods
*/

// Requirements
const uuid4 = require('uuid/v4');
const CRYPT = require('./crypt');
const { utcTimestamp } = require('./helpers');

// Calculate hash of a block
const calculateHash = (eventId, organization, generatedTime, data) => {
  const toHash = `${eventId}|${organization}|${generatedTime}|${data}`;
  return CRYPT.md5(toHash).toString();
}

// Convert to block object
const toBlock = b => block(b.hash, b.eventId, b.organization, b.generatedTime, b.data);

// Block object
const block = (hash, eventId, organization, generatedTime, data) => ({
  hash: hash,
  eventId: eventId,
  organization: organization,
  generatedTime: generatedTime,
  data: data
});

// Generate a block
const generateNextBlock = (organization, data) => {
  const eventId = uuid4()
  const generatedTime = utcTimestamp();
  const hash = calculateHash(eventId, organization, generatedTime, data);
  return block(hash, eventId, organization, generatedTime, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = b => calculateHash(b.eventId, b.organization, b.generatedTime, b.data);

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
