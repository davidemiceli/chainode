'use strict';
/*
  Block methods
*/

// Requirements
const CRYPT = require('./crypt');
const { utcTimestamp } = require('./helpers');

// Calculate hash of a block
const calculateHash = (eventId, company, proposedTime, data) => {
  const toHash = `${eventId}|${company}|${proposedTime}|${data}`;
  return CRYPT.md5(toHash).toString();
}

// Convert to block object
const toBlock = b => block(b.hash, b.eventId, b.company, b.proposedTime, b.generatedTime, b.data);

// Block object
const block = (hash, eventId, company, proposedTime, generatedTime, data) => ({
  hash: hash,
  eventId: eventId,
  company: company,
  proposedTime: proposedTime,
  generatedTime: generatedTime,
  data: data
});

// Generate a block
const generateNextBlock = (eventId, company, proposedTime, data) => {
  const generatedTime = utcTimestamp();
  const hash = calculateHash(eventId, company, proposedTime, data);
  return block(hash, eventId, company, proposedTime, generatedTime, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = (block) => calculateHash(block.eventId, block.company, block.proposedTime, block.data);

// Check if a block is valid
const isValidBlock = (logger, block) => {
  const oneBlockHash = calculateHashFromBlock(block);
  if (oneBlockHash !== block.hash) {
    logger.error(`Invalid hash ${block.hash} compared to ${oneBlockHash}.`);
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
