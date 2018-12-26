'use strict';
/*
  Entrypoint for the Block Generator peer
*/

// Requirements
const Broker = require('../lib/broker');
const errors = require(`../lib/errors`);
const { syncBlocks } = require('../lib/block');


// Blockchain sdk
module.exports = class {

  // Init SDK
  constructor(configs) {
    // Check params
    if (!/^(blockgenerator|peer)$/.test(configs.type)) throw Error(`Invalid peer type ${configs.type}.`);
    this.configs = configs;
  }

  // Shutdown the peer broker
  async shutdown() {
    if (this.__broker) await this.__broker.stop();
    return this;
  }

  // Start peer broker
  async start() {
    try {
      // Check params
      const {type, name} = this.configs;
      // Init the broker
      const broker = await Broker(name, type, this.configs);
      broker.logger.info(`Starting ${type} with name ${name}.`);
      this.__broker = broker;
      this.logger = broker.logger;
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

  // Sync missing blocks
  async synchronizeBlocks(timing) {
    try {
      timing = timing || 1000;
      this.__broker.logger.info(`Starting block synchronization...`);
      await syncBlocks(this.__broker, timing);
      this.__broker.logger.info(`Block synchronization completed.`);
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

  // Propose a block transaction
  async propose(data) {
    try {
      await this.__broker.call('blockgenerator.transaction.add', data);
      return this;
    } catch(err) {
      await errors(this.__broker, err);
    }
  }

}
