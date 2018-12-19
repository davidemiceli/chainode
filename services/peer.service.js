'use strict';

// Requirements
const metrics = require('../configs/services/metrics');
const eventErrors = require('../lib/events/errors');
const LedgerModel = require('../models/mongodb/methods/ledger');
const { syncBlocks } = require('../lib/block');

const GROUP = process.env.GROUP;
if (!GROUP) throw Error('Missing environmental group variable.');

// Add a new block to the ledger
const add = async function(data, sender, eventName) {
  try {
    // Data to build a new block
    this.logger.info(`Received the block ${data.hash} by ${sender}.`);
    // Store block on db
    await LedgerModel.AddBlock(data);
    this.logger.info('Added new block:', data);
    // Return the new block
    return data.hash;
  } catch(err) {
    eventErrors(this, err, eventName);
  }
}

// Sync missing blocks
const syncMissingBlocks = async function(data, sender, eventName) {
  try {
    this.broker.logger.info(`Starting block synchronization...`);
    const timing = data.timing;
    return await syncBlocks(this.broker, timing);
  } catch(err) {
    eventErrors(this, err, eventName);
  }
}

module.exports = function() {
  return {
    name: "peer",
    events: {
      // group: GROUP,
      "block.added": add,
      "$block.sync": syncMissingBlocks
    }
  };
};
