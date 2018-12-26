'use strict';

// Requirements
const metrics = require('../configs/services/metrics');
const errors = require('../lib/services/errors');
const {
  toBlock,
  generateNextBlock
} = require('../lib/block');


// Generate a block
const add = async ctx => {
  try {
    // Get db model instance
    const db = ctx.broker.DB;
    // Data to build a new block
    const data = ctx.params;
    // Generate block using previous block
    const newblock = await generateNextBlock(db, data);
    ctx.broker.logger.info(`Building a block for the transaction ${newblock.hash} sended by ${ctx.nodeID}.`);
    // Store block on db
    await db.Ledger.AddBlock(newblock);
    ctx.broker.logger.info(`Block #${newblock.index} ${newblock.hash} was added to the ledger.`);
    // Broadcast block
    await ctx.broker.callAll('peer.block.added', newblock);
    // Return the new block
    return newblock.hash;
  } catch(err) {
    errors(ctx, err);
  }
}

// Get latest blocks
const latestBlocks = async ctx => {
  try {
    // Get db model instance
    const db = ctx.broker.DB;
    // Data to build a new block
    const condition = ctx.params;
    // Get last blocks
    const blocks = await db.Ledger.GetBlocks(condition, 25);
    return blocks.map(toBlock);
  } catch(err) {
    errors(ctx, err);
  }
}

module.exports = () => ({
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
});
