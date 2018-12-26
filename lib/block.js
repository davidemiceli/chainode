'use strict';

// Requirements
const CRYPT = require('./crypt');

// Timeout
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

// Block methods

// Calculate hash of a block
const calculateHash = (index, timestamp, data) => {
  const toHash = `${index}|${timestamp}|${data}`;
  return CRYPT.md5(toHash);
}

// Convert to block object
const toBlock = (blockdata) => block(blockdata.hash, blockdata.index, blockdata.timestamp, blockdata.data);

// Block object
const block = (hash, index, timestamp, data) => ({
  index: index,
  timestamp: timestamp,
  hash: hash.toString(),
  data: data
});

// Generate a block
const generateNextBlock = async (db, data) => {
  const index = await db.Counter.nextIndex('block-ledger');
  const timestamp = Date.now();
  const hash = calculateHash(index, timestamp, data);
  return block(hash, index, timestamp, data);
}

// Calculate the hash from a block
const calculateHashFromBlock = (block) => calculateHash(block.index, block.timestamp, block.data);

// Check if a block is valid
const isValidBlock = (oneBlock) => {
  const oneBlockHash = calculateHashFromBlock(oneBlock);
  if (oneBlockHash !== oneBlock.hash) {
    console.log(`Invalid hash ${oneBlock.hash} compared to ${oneBlockHash}.`);
    return false;
  }
  return true;
}

// Synchronize blocks
const syncBlocks = async (broker, timing) => {
  try {
    // Get database model
    const db = broker.DB;
    // Get latest block
    const latestBlock = await db.Ledger.GetLatestBlock();
    const lBlock = latestBlock && latestBlock[0];
    broker.logger.info('Last added block is', lBlock || 'missing');
    const lastBlockIndex = lBlock && lBlock.index;
    const condition = {index: lastBlockIndex};
    const blocks = await broker.call('blockgenerator.blocks', condition);
    broker.logger.info(`Received ${blocks.length} blocks to synchronize.`);

    for (const [i, newblock] of blocks.entries()) {
      // Check if the block is valid
      const valid = (i === 0 && newblock.index === 1) ? true : isValidBlock(newblock);
      if (valid) {
        // Store on db if it is valid
        try {
          await db.Ledger.AddBlock(newblock);
          broker.logger.info(`Added new block ${newblock.hash}`);
        } catch(err) {
          broker.logger.info(`Error to add new block ${newblock.hash}`);
          broker.logger.error(err && err.stack);
        }
      } else {
        // Raise an error if not valid
        throw Error(`Found invalid block with hash ${newblock.hash}.`);
      }
    }
    broker.logger.info(`Synchronized ${blocks.length} blocks.`);
    if (blocks.length) {
      // Wait and repeat sync action
      await timeout(timing);
      return await syncBlocks(broker, db, timing);
    }
    return true;
  } catch(err) {
    broker.logger.error('Error during ledger synchronization.');
    broker.logger.error(err && err.stack);
    throw Error(err);
  }
}


module.exports = {
  toBlock,
  generateNextBlock,
  syncBlocks
};
