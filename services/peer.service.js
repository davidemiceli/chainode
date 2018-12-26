'use strict';

// Requirements
const metrics = require('../configs/services/metrics');
const errors = require('../lib/services/errors');


// Add a new block to the ledger
const added = async ctx => {
  try {
    // Get db model instance
    const db = ctx.broker.DB;
    // New ledger block
    const data = ctx.params;
    ctx.broker.logger.info(`Received the block ${data.hash} (#${data.index}) by ${ctx.nodeID}.`);
    // Store block on db
    await db.Ledger.AddBlock(data);
    ctx.broker.logger.info('Added new block:', data);
    // Return the new block
    return data.hash;
  } catch(err) {
    errors(ctx, err);
  }
}

module.exports = () => ({
  name: 'peer',
  actions: {
    'block.added': {
      metrics: metrics,
      handler: added
    }
  }
});
