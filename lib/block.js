'use strict';
/*
  Block methods
*/

// Requirements
const CRYPT = require('./crypt');
const { utcTimestamp } = require('./helpers');

// Calculate hash of a block
const calculateHash = (id, data) => {
  const toHash = `${id}|${data}`;
  return CRYPT.md5(toHash).toString();
}

// Convert to block object
const toBlock = (blockdata) => block(blockdata.hash, blockdata.id, blockdata.proposedTime, blockdata.generatedTime, blockdata.data);

// Block object
const block = (hash, id, proposedTime, generatedTime, data) => ({
  hash: hash,
  id: id,
  proposedTime: proposedTime,
  generatedTime: generatedTime,
  data: data
});

// Generate a block
const generateNextBlock = (id, timestamp, data) => {
  const proposedTime = timestamp;
  const generatedTime = utcTimestamp();
  const hash = calculateHash(id, data);
  return block(hash, id, proposedTime, generatedTime, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = (block) => calculateHash(block.id, block.data);

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
