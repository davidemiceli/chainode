'use strict';

// Requirements
const metrics = require('../configs/services/metrics');
const errors = require('../lib/services/errors');
const LedgerModel = require('../models/mongodb/methods/ledger');
const {
  toBlock,
  generateNextBlock
} = require('../lib/block');


// Generate a block
const add = async function(ctx) {
  try {
    // Data to build a new block
    const data = ctx.params;
    // Generate block using previous block
    const newblock = await generateNextBlock(data);
    this.logger.info(`Building a block for the transaction ${newblock.hash} sended by ${ctx.nodeID}.`);
    // Store block on db
    await LedgerModel.AddBlock(newblock);
    this.logger.info(`Block ${newblock.hash} was added to the ledger.`);
    // Broadcast block
    await ctx.emit('block.added', newblock);
    this.logger.info(`Broadcasted block ${newblock.hash}.`);
    // Return the new block
    return newblock.hash;
  } catch(err) {
    errors(ctx, err);
  }
}

// Get latest blocks
const latestBlocks = async function(ctx) {
  try {
    // Data to build a new block
    const condition = ctx.params;
    // Get last blocks
    const blocks = await LedgerModel.GetBlocks(condition, 25);
    return blocks.map(toBlock);
  } catch(err) {
    errors(ctx, err);
  }
}

module.exports = function() {
  return {
    name: 'blockgenerator',
    actions: {
      'transaction.add': {
        metrics: metrics,
        handler: add
      },
      'blocks': {
        metrics: metrics,
        handler: latestBlocks
      }
    }
  };
};
